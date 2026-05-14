import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { updateReview } from '@/lib/reviews';

const requiredFields = ['title', 'dek', 'venue', 'location', 'rating', 'category', 'image', 'body'];

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  for (const key of requiredFields) {
    if (!body[key]) {
      return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });
    }
  }

  const review = await updateReview(id, {
    title: body.title,
    dek: body.dek,
    venue: body.venue,
    location: body.location,
    rating: Number(body.rating),
    category: body.category,
    image: body.image,
    tags: Array.isArray(body.tags) ? body.tags : [],
    body: body.body,
    slug: body.slug,
    date: body.date,
  });

  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json(review);
}
