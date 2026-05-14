import Link from 'next/link';
import { getReviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "ALL REVIEWS — SWATI'S FOOD REVIEW",
  description: 'THE FOOD AUDIT — Browse all food reviews by Swati Kharbanda.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="px-5 py-20 text-center sm:px-8"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4 opacity-70"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'var(--color-cream)',
          }}
        >
          THE FOOD AUDIT
        </p>
        <h1
          className="leading-none mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            color: 'var(--color-white)',
            letterSpacing: '0.04em',
          }}
        >
          ALL REVIEWS
        </h1>
        <p
          className="max-w-xl mx-auto text-base md:text-lg leading-relaxed opacity-80"
          style={{
            fontFamily: "'Special Elite', Georgia, serif",
            color: 'var(--color-cream)',
          }}
        >
          Every visit is an audit. Quality engineering meets food culture &mdash;
          structured evaluations of the places I eat, visit, and experience.
        </p>
      </section>

      {/* ===== REVIEWS GRID ===== */}
      <section className="section-cream px-5 py-20 sm:px-8">
        <div className="max-w-screen-xl mx-auto">

          <ScrollReveal>
            <div
              className="mb-12 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'var(--color-dark)',
                  letterSpacing: '0.04em',
                }}
              >
                {reviews.length} REVIEW{reviews.length !== 1 ? 'S' : ''}
              </h2>
              <span
                className="text-xs uppercase tracking-widest opacity-50"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: 'var(--color-text)',
                }}
              >
                SORTED BY DATE
              </span>
            </div>
          </ScrollReveal>

          {reviews.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-lg opacity-60"
                style={{
                  fontFamily: "'Special Elite', Georgia, serif",
                  color: 'var(--color-text)',
                }}
              >
                No reviews yet. The first audit is coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <ScrollReveal key={review.slug} delay={i * 80}>
                  <ReviewCard review={review} />
                </ScrollReveal>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section
        className="px-5 py-16 text-center sm:px-8"
        style={{ backgroundColor: 'var(--color-dark)' }}
      >
        <ScrollReveal>
          <p
            className="text-xl mb-8 opacity-70"
            style={{
              fontFamily: "'Special Elite', Georgia, serif",
              color: 'var(--color-cream)',
            }}
          >
            Want to know how the audits work?
          </p>
          <Link href="/about" className="btn-ghost">
            ABOUT THE REVIEWER
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
