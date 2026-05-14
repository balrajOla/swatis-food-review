import { afterEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { slugify, updateReview } from '@/lib/reviews';

describe('review utilities', () => {
  afterEach(() => {
    delete process.env.REVIEWS_DATA_PATH;
  });

  it('creates clean slugs', () => {
    expect(slugify('Street Food & Chaat!')).toBe('street-food-and-chaat');
  });

  it('updates an existing local JSON review without changing id/date defaults', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'swati-reviews-'));
    const file = path.join(dir, 'reviews.json');
    process.env.REVIEWS_DATA_PATH = file;

    await fs.writeFile(file, JSON.stringify([
      {
        id: 'review-1',
        slug: 'old-slug',
        title: 'Old title',
        dek: 'Old summary',
        venue: 'Old venue',
        location: 'Old location',
        rating: 3,
        category: 'Cafe Review',
        date: '2026-01-01',
        image: 'https://example.com/old.jpg',
        tags: ['old'],
        body: 'Old body'
      }
    ], null, 2));

    const updated = await updateReview('review-1', {
      title: 'New title',
      dek: 'New summary',
      venue: 'New venue',
      location: 'London',
      rating: 4.5,
      category: 'Restaurant Review',
      image: 'https://example.com/new.jpg',
      tags: ['new', 'edited'],
      body: 'New body'
    });

    expect(updated.id).toBe('review-1');
    expect(updated.date).toBe('2026-01-01');
    expect(updated.slug).toBe('old-slug');
    expect(updated.title).toBe('New title');
    expect(updated.rating).toBe(4.5);

    const stored = JSON.parse(await fs.readFile(file, 'utf8'));
    expect(stored[0].body).toBe('New body');
    expect(stored[0].tags).toEqual(['new', 'edited']);
  });
});
