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
      <div className={`hover-zoom relative w-full overflow-hidden ${featured ? 'h-72 sm:h-80' : 'h-52'}`}>
        <Image
          src={review.image}
          alt={review.venue}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Rating badge */}
        <div className="absolute top-3 right-3">
          <span className="rating-badge">
            &#9733; {review.rating.toFixed(1)}
          </span>
        </div>
        {/* Category */}
        <div className="image-text-backer absolute bottom-3 left-3 text-xs uppercase tracking-widest">
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
            color: 'var(--color-muted)',
          }}
        >
          {review.venue} &middot; {review.location}
        </div>

        {/* Title */}
        <h3
          className={`mb-3 break-words leading-none transition-opacity group-hover:opacity-70 ${featured ? 'text-4xl' : 'text-3xl'}`}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: 'var(--color-heading)',
          }}
        >
          {review.title}
        </h3>

        {/* Dek */}
        <p
          className="text-sm leading-relaxed mb-4 opacity-75 line-clamp-3"
          style={{
            fontFamily: "'Special Elite', Georgia, serif",
            color: 'var(--color-muted)',
          }}
        >
          {review.dek}
        </p>

        {/* Date */}
        <div
          className="text-xs uppercase tracking-widest opacity-50"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'var(--color-muted)',
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
