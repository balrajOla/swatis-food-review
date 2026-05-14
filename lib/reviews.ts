import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { Review, ReviewInput } from './types';

function dataPath() {
  if (process.env.NODE_ENV === 'test' && process.env.REVIEWS_DATA_PATH) {
    return process.env.REVIEWS_DATA_PATH;
  }
  return path.join(/*turbopackIgnore: true*/ process.cwd(), 'data', 'reviews.json');
}

const table = process.env.SUPABASE_REVIEWS_TABLE || 'reviews';

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

function hasSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function supabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
}

async function readLocalReviews(): Promise<Review[]> {
  const raw = await fs.readFile(dataPath(), 'utf8');
  return JSON.parse(raw) as Review[];
}

async function writeLocalReviews(reviews: Review[]) {
  await fs.writeFile(dataPath(), JSON.stringify(reviews, null, 2));
}

export async function getReviews(): Promise<Review[]> {
  if (hasSupabase()) {
    const { data, error } = await supabase().from(table).select('*').order('date', { ascending: false });
    if (error) throw error;
    return (data || []) as Review[];
  }
  return (await readLocalReviews()).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getReviewBySlug(slug: string) {
  return (await getReviews()).find((r) => r.slug === slug) || null;
}

export async function createReview(input: ReviewInput): Promise<Review> {
  const review: Review = {
    ...input,
    id: crypto.randomUUID(),
    slug: input.slug || slugify(input.title),
    date: input.date || new Date().toISOString().slice(0, 10),
    tags: input.tags || [],
  };

  if (hasSupabase()) {
    const { data, error } = await supabase().from(table).insert(review).select('*').single();
    if (error) throw error;
    return data as Review;
  }

  const current = await getReviews();
  const next = [review, ...current];
  await writeLocalReviews(next);
  return review;
}

export async function updateReview(id: string, input: ReviewInput): Promise<Review | null> {
  if (hasSupabase()) {
    const { data, error } = await supabase()
      .from(table)
      .update({ ...input, tags: input.tags || [] })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return data as Review;
  }

  const current = await readLocalReviews();
  const index = current.findIndex((review) => review.id === id);
  if (index === -1) return null;

  const existing = current[index];
  const updated: Review = {
    ...existing,
    ...input,
    id: existing.id,
    slug: input.slug || existing.slug,
    date: input.date || existing.date,
    tags: input.tags || [],
  };

  const next = [...current];
  next[index] = updated;
  await writeLocalReviews(next);
  return updated;
}
