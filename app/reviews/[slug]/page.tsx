import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews, getReviewBySlug } from '@/lib/reviews';
import ScrollReveal from '@/components/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const reviews = await getReviews();
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return {};
  return {
    title: `${review.title} — SWATI'S FOOD REVIEW`,
    description: review.dek,
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const paragraphs = review.body.split('\n\n').filter(Boolean);

  return (
    <>
      {/* ===== HERO IMAGE ===== */}
      <section className="relative aspect-video w-full min-h-[360px] overflow-hidden sm:min-h-[420px]">
        <Image
          src={review.image}
          alt={review.venue}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(16,16,16,0.35) 0%, rgba(16,16,16,0.75) 100%)' }}
        />

        {/* Category + location top-left */}
        <div className="absolute top-6 left-5 z-10 sm:left-8 sm:top-8">
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'var(--color-cream)',
              letterSpacing: '0.2em',
            }}
          >
            {review.category} &middot; {review.location}
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-8 sm:px-8 sm:pb-10">
          <h1
            className="leading-none mb-3"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              color: 'var(--color-white)',
              letterSpacing: '0.03em',
            }}
          >
            {review.title}
          </h1>
          <p
            className="text-base md:text-xl max-w-2xl opacity-85"
            style={{
              fontFamily: "'Special Elite', Georgia, serif",
              color: 'var(--color-cream)',
              lineHeight: 1.6,
            }}
          >
            {review.dek}
          </p>
        </div>
      </section>

      {/* ===== TAGS ===== */}
      {review.tags && review.tags.length > 0 && (
        <div
          className="flex flex-wrap gap-2 border-b px-5 py-5 sm:px-8"
          style={{
            backgroundColor: 'var(--color-dark)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs uppercase tracking-widest border"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'var(--color-cream)',
                borderColor: 'rgba(255,255,255,0.25)',
                borderRadius: '3px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ===== METADATA BAR ===== */}
      <ScrollReveal>
        <div
          className="grid gap-6 border-b px-5 py-8 sm:px-8 md:grid-cols-3"
          style={{
            backgroundColor: 'var(--color-cream)',
            borderColor: 'var(--color-border)',
          }}
        >
          {/* Venue */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-1 opacity-50"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-text)' }}
            >
              VENUE
            </div>
            <div
              className="text-xl"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--color-dark)',
                letterSpacing: '0.04em',
              }}
            >
              {review.venue}
            </div>
            <div
              className="text-sm opacity-60 mt-0.5"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-text)' }}
            >
              {review.location}
            </div>
          </div>

          {/* Rating */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-1 opacity-50"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-text)' }}
            >
              RATING
            </div>
            <div
              className="text-xl flex items-baseline gap-2"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--color-dark)',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ color: 'var(--color-accent)' }}>{review.rating.toFixed(1)}</span>
              <span className="text-sm opacity-40">/ 5.0</span>
            </div>
            <div
              className="text-sm opacity-60 mt-0.5"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-text)' }}
            >
              Quality Audit Score
            </div>
          </div>

          {/* Date */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-1 opacity-50"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-text)' }}
            >
              DATE
            </div>
            <div
              className="text-xl"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--color-dark)',
                letterSpacing: '0.04em',
              }}
            >
              {new Date(review.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div
              className="text-sm opacity-60 mt-0.5"
              style={{ fontFamily: "'Special Elite', Georgia, serif", color: 'var(--color-text)' }}
            >
              {review.category}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ===== BODY TEXT ===== */}
      <section className="section-cream px-5 py-16 sm:px-8">
        <div className="max-w-2xl mx-auto">
          {paragraphs.map((para, i) => {
            const isHeading = para === para.toUpperCase() && para.length < 80 && !para.includes('.');
            return (
              <ScrollReveal key={i} delay={i < 5 ? i * 80 : 0}>
                {isHeading ? (
                  <h3
                    className="mt-10 mb-3"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.6rem',
                      color: 'var(--color-primary)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {para}
                  </h3>
                ) : (
                  <p
                    className="mb-5 text-base md:text-lg"
                    style={{
                      fontFamily: "'Special Elite', Georgia, serif",
                      color: 'var(--color-text)',
                      lineHeight: 1.85,
                    }}
                  >
                    {para}
                  </p>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ===== BACK / FOOTER CTA ===== */}
      <section
        className="border-t px-5 py-16 text-center sm:px-8"
        style={{
          backgroundColor: 'var(--color-blush)',
          borderColor: 'var(--color-border)',
        }}
      >
        <ScrollReveal>
          <p
            className="text-xs uppercase tracking-widest mb-6 opacity-50"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-dark)' }}
          >
            THE FOOD AUDIT
          </p>
          <Link href="/reviews" className="btn-outline">
            &larr; ALL REVIEWS
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
