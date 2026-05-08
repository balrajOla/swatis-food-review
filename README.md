# Swati's Food Review

A mobile-first editorial food-review website inspired by the calm, whitespace-heavy feeling of Green Kitchen Stories, without copying its code, logo, assets or exact layout.

## What is included

- Next.js App Router + TypeScript
- Responsive public pages: home, all reviews, review detail, about
- Password-protected `/admin` publishing UI
- Public read access for everyone
- Local JSON content fallback for demos
- Supabase-ready repository abstraction for scalable persistent publishing
- Soft editorial UX, hover transitions, reveal animations, image-led cards

## Run locally

```bash
npm install
cp .env.example .env.local
# edit ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm run dev
```

Open `http://localhost:3000`.

## Publishing

1. Visit `/admin`
2. Enter `ADMIN_PASSWORD`
3. Add title, venue, rating, tags, review body and image URL
4. Submit. The post appears publicly under `/reviews/[slug]`

Local mode writes to `data/reviews.json`. On Vercel/serverless, use Supabase for persistence.

## Supabase setup

Create a `reviews` table with columns matching:

```sql
create table reviews (
  id text primary key,
  slug text unique not null,
  title text not null,
  dek text not null,
  venue text not null,
  location text not null,
  rating numeric not null,
  category text not null,
  date text not null,
  image text not null,
  tags text[] default '{}',
  body text not null
);
```

Set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_REVIEWS_TABLE=reviews
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

## LinkedIn content note

LinkedIn posts were not imported because the public profile was blocked behind LinkedIn sign-in. Replace the sample reviews with Swati's approved text/images, or provide exported post text/images and they can be imported into `data/reviews.json` or Supabase.
