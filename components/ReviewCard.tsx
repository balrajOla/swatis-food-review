import Link from 'next/link';
import Image from 'next/image';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
  featured?: boolean;
}

export default function ReviewCard({ review, featured = false }: ReviewCardProps) {
  return (
    <Link href={`/reviews/${review.slug}`} className="block group card-review">

      {/* Image */}
      <div className={`hover-zoom relative w-full overflow-hidden ${featured ? 'h-80' : 'h-52'}`}>
        <Image
          src={review.image}
          alt={review.venue}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />
        {/* Rating badge */}
        <div className="absolute top-3 right-3">
          <span className="rating-badge">
            &#9733; {review.rating.toFixed(1)}
          </span>
        </div>
        {/* Category */}
        <div
          className="absolute bottom-3 left-3 text-xs uppercase tracking-widest"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: 'var(--color-cream)',
            letterSpacing: '0.15em',
            fontSize: '0.75rem',
          }}
        >
          {review.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Venue · Location */}
        <div
          className="text-xs uppercase tracking-widest mb-3 opacity-60"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'var(--color-text)',
          }}
        >
          {review.venue} &middot; {review.location}
        </div>

        {/* Title */}
        <h3
          className={`leading-none mb-3 group-hover:opacity-70 transition-opacity ${featured ? 'text-4xl' : 'text-3xl'}`}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: 'var(--color-dark)',
          }}
        >
          {review.title}
        </h3>

        {/* Dek */}
        <p
          className="text-sm leading-relaxed mb-4 opacity-75 line-clamp-3"
          style={{
            fontFamily: "'Special Elite', Georgia, serif",
            color: 'var(--color-text)',
          }}
        >
          {review.dek}
        </p>

        {/* Date */}
        <div
          className="text-xs uppercase tracking-widest opacity-50"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'var(--color-text)',
          }}
        >
          {new Date(review.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

      </div>
    </Link>
  );
}
