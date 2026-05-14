import Link from 'next/link';
import Image from 'next/image';
import { getReviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import ScrollReveal from '@/components/ScrollReveal';

const HERO_PANELS = [
  {
    num: '01',
    title: 'THE MOON',
    location: 'HARROW',
    slug: 'the-moon-harrow-food-audit',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    title: 'DULCIS GELATO',
    location: 'CAMBRIDGE',
    slug: 'dulcis-gelato-pasticcini-cambridge-food-audit',
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    title: "DAISY'S IN THE PARK",
    location: 'PINNER',
    slug: 'daisys-in-the-park-pinner-food-audit',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
  },
];

const AUDIT_ROWS = [
  { criteria: 'PRODUCT INTEGRITY', detail: "Does the meal live up to the brand's promise?" },
  { criteria: 'OPERATIONAL FLOW',  detail: 'How efficient is service from order to table?' },
  { criteria: 'SENSORY QC',         detail: "The human details data can't capture." },
  { criteria: 'ATMOSPHERE',         detail: 'Location, vibe, and user personas served.' },
  { criteria: 'VALUE',              detail: 'Does the experience justify the price?' },
];

export default async function HomePage() {
  const reviews = await getReviews();
  const [featured, ...rest] = reviews;
  const sideCards = rest.slice(0, 2);

  return (
    <>
      {/* ===== SECTION 1: HERO PANELS ===== */}
      <section className="md:hidden">
        <div className="overflow-x-auto px-5 pt-5 hero-mobile-scroll">
          <div className="flex w-max gap-4 pb-4">
            {HERO_PANELS.map((panel, i) => (
              <Link
                key={panel.slug}
                href={`/reviews/${panel.slug}`}
                className="hero-panel group relative h-[68svh] min-h-[520px] w-[84vw] shrink-0 snap-start overflow-hidden rounded-[8px]"
              >
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  priority={i === 0}
                  sizes="84vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="hero-panel-overlay absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: 'rgba(16,16,16,0.55)' }} />
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-5">
                  <div
                    className="text-right"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(5.5rem, 24vw, 9rem)',
                      lineHeight: 0.9,
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(255,255,255,0.4)',
                      letterSpacing: '-0.02em',
                      marginTop: '2.5rem',
                    }}
                  >
                    {panel.num}
                  </div>

                  <div className="hero-panel-text pb-1">
                    <div className="mb-2 font-ui text-[0.68rem] uppercase tracking-[0.22em] text-cream opacity-80">
                      {panel.location}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 'clamp(2rem, 9vw, 3rem)',
                        color: 'var(--color-white)',
                        lineHeight: 1,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {panel.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-5 pb-6 pt-1 text-center">
          <p className="mb-4 font-ui text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">Swipe through featured audits</p>
          <Link href="/reviews" className="btn-outline">
            READ ALL REVIEWS
          </Link>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden md:flex">
        {HERO_PANELS.map((panel, i) => (
          <Link
            key={panel.slug}
            href={`/reviews/${panel.slug}`}
            className="hero-panel group"
            style={{ flex: 1 }}
          >
            <div className="absolute inset-0">
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                priority={i === 0}
                sizes="33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>

            <div
              className="hero-panel-overlay absolute inset-0 transition-opacity duration-500"
              style={{ backgroundColor: 'rgba(16,16,16,0.55)' }}
            />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 lg:p-10">
              <div
                className="text-right"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(6rem, 15vw, 14rem)',
                  lineHeight: 0.9,
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.4)',
                  letterSpacing: '-0.02em',
                  marginTop: '4rem',
                }}
              >
                {panel.num}
              </div>

              <div className="hero-panel-text max-w-[18rem] pb-2 lg:max-w-[22rem]">
                <div className="mb-2 font-ui text-xs uppercase tracking-widest text-cream opacity-70">
                  {panel.location}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: 'var(--color-white)',
                    lineHeight: 1.05,
                    letterSpacing: '0.04em',
                  }}
                >
                  {panel.title}
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <Link href="/reviews" className="btn-ghost">
            READ ALL REVIEWS
          </Link>
        </div>
      </section>

      {/* ===== SECTION 2: TAGLINE BAND ===== */}
      <section className="px-5 py-24 text-center sm:px-8"
        style={{ backgroundColor: 'var(--color-dark)' }}
      >
        <ScrollReveal>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--color-white)',
              letterSpacing: '0.04em',
              lineHeight: 1.05,
            }}
          >
            AI CAN&apos;T TASTE.<br />A QUALITY ENGINEER CAN.
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed opacity-70"
            style={{
              fontFamily: "'Special Elite', Georgia, serif",
              color: 'var(--color-cream)',
            }}
          >
            I apply a quality engineering lens to every visit &mdash; product integrity,
            operational flow, sensory quality control.
          </p>
        </ScrollReveal>
      </section>

      {/* ===== SECTION 3: FEATURED REVIEWS EDITORIAL GRID ===== */}
      <section className="section-cream px-5 py-20 sm:px-8">
        <div className="max-w-screen-xl mx-auto">

          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: 'var(--color-border)' }}>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: 'var(--color-dark)',
                  letterSpacing: '0.04em',
                }}
              >
                LATEST REVIEWS
              </h2>
              <Link
                href="/reviews"
                className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--color-primary)' }}
              >
                VIEW ALL &rarr;
              </Link>
            </div>
          </ScrollReveal>

          {/* Asymmetric 2-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Featured large card */}
            {featured && (
              <ScrollReveal delay={0}>
                <ReviewCard review={featured} featured={true} />
              </ScrollReveal>
            )}

            {/* Stacked smaller cards */}
            <div className="flex flex-col gap-6">
              {sideCards.map((review, i) => (
                <ScrollReveal key={review.slug} delay={(i + 1) * 150}>
                  <ReviewCard review={review} />
                </ScrollReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== SECTION 4: AUDIT PHILOSOPHY TABLE ===== */}
      <section className="section-green px-5 py-20 sm:px-8">
        <div className="max-w-screen-xl mx-auto">

          <ScrollReveal>
            <h2
              className="mb-12 text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--color-white)',
                letterSpacing: '0.04em',
              }}
            >
              THE AUDIT CRITERIA
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <table className="audit-table max-w-3xl mx-auto">
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.35)' }}>
                  <td
                    className="pb-3 text-sm uppercase tracking-widest"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    CRITERIA
                  </td>
                  <td
                    className="pb-3 text-sm uppercase tracking-widest"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    WHAT I LOOK FOR
                  </td>
                </tr>
              </thead>
              <tbody>
                {AUDIT_ROWS.map((row) => (
                  <tr key={row.criteria}>
                    <td>{row.criteria}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="text-center mt-14">
              <Link href="/reviews" className="btn-primary">
                READ THE REVIEWS
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ===== SECTION 5: ABOUT STRIP ===== */}
      <section className="section-blush px-5 py-20 sm:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <ScrollReveal>
              <div>
                <h2
                  className="mb-6 leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: 'var(--color-dark)',
                    letterSpacing: '0.03em',
                  }}
                >
                  SWATI KHARBANDA &mdash;<br />QUALITY ENGINEER<br />&amp; FOOD REVIEWER
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed mb-8 opacity-80"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                  }}
                >
                  The Food Audit applies a quality engineering lens to the dining experience.
                  Every visit is a structured evaluation &mdash; measuring product integrity,
                  operational flow, sensory quality control, and value. Because great food
                  deserves more than a star rating.
                </p>
                <Link href="/about" className="btn-outline">
                  ABOUT THE REVIEWER
                </Link>
              </div>
            </ScrollReveal>

            {/* Right image */}
            <ScrollReveal delay={200}>
              <div
                className="relative h-72 overflow-hidden rounded-sm hover-zoom sm:h-80 lg:h-[26rem]"
                style={{ borderRadius: '6px' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
                  alt="Food photography"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
