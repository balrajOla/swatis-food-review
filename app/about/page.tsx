import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "ABOUT — SWATI'S FOOD REVIEW",
  description: "THE FOOD AUDIT — Swati Kharbanda, Quality Engineer & Food Reviewer based in London.",
};

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="py-28 px-8 text-center"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <ScrollReveal>
          <p
            className="text-xs uppercase tracking-widest mb-4 opacity-60"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'var(--color-cream)',
            }}
          >
            THE FOOD AUDIT
          </p>
          <h1
            className="leading-none mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: 'var(--color-white)',
              letterSpacing: '0.04em',
            }}
          >
            SWATI<br />KHARBANDA
          </h1>
          <p
            className="text-base md:text-xl tracking-wide opacity-80"
            style={{
              fontFamily: "'Special Elite', Georgia, serif",
              color: 'var(--color-cream)',
            }}
          >
            Quality Engineer &middot; Food Auditor &middot; London
          </p>
        </ScrollReveal>
      </section>

      {/* ===== PULL QUOTE ===== */}
      <section className="section-cream py-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal>
            <blockquote
              className="text-center mb-20 max-w-4xl mx-auto"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--color-dark)',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              &ldquo;AI CAN&apos;T TASTE.<br />
              DATA CAN&apos;T SMELL THE BREAD.<br />
              A QUALITY ENGINEER CAN.&rdquo;
            </blockquote>
          </ScrollReveal>

          {/* Two-column content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left column */}
            <ScrollReveal>
              <div>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  WHAT IS THE FOOD AUDIT?
                </h2>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                    lineHeight: 1.85,
                  }}
                >
                  The Food Audit is a food review series applying quality engineering
                  principles to the dining experience. Every visit is a structured evaluation
                  that goes beyond &ldquo;was it nice?&rdquo; and asks &ldquo;how did it perform?&rdquo;
                </p>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                    lineHeight: 1.85,
                  }}
                >
                  As a quality engineer by profession, I apply the same analytical rigour
                  I use in software development to restaurants, cafes, and food experiences.
                  The result is a review that captures what data alone cannot.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                    lineHeight: 1.85,
                  }}
                >
                  From operational flow and service lead times to sensory quality control
                  and product integrity, every aspect of the experience is measured,
                  documented, and shared.
                </p>
              </div>
            </ScrollReveal>

            {/* Right column */}
            <ScrollReveal delay={200}>
              <div>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  THE METHODOLOGY
                </h2>
                {[
                  { label: 'PRODUCT INTEGRITY', text: "Does the food live up to the brand's promise? Are the ingredients what they claim to be?" },
                  { label: 'OPERATIONAL FLOW', text: 'How efficient is the service pipeline from order to table? Where are the bottlenecks?' },
                  { label: 'SENSORY QC', text: 'Taste, texture, temperature, presentation. The qualitative signals that analytics cannot replicate.' },
                  { label: 'ATMOSPHERE', text: 'Setting, user personas, vibe. The environmental context that frames the experience.' },
                  { label: 'VALUE', text: 'Does the price point match the quality delivered? What is the cost-to-experience ratio?' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="mb-5 pb-5 border-b"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="text-sm mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: 'var(--color-dark)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {item.label}
                    </div>
                    <p
                      className="text-sm leading-relaxed opacity-70"
                      style={{
                        fontFamily: "'Special Elite', Georgia, serif",
                        color: 'var(--color-text)',
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ===== IMAGE + BIO ===== */}
      <section className="section-blush py-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <ScrollReveal>
              <div
                className="relative h-80 lg:h-[28rem] overflow-hidden hover-zoom"
                style={{ borderRadius: '6px' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                  alt="Food from the audit"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    color: 'var(--color-dark)',
                    letterSpacing: '0.04em',
                  }}
                >
                  QUALITY ENGINEERING<br />MEETS FOOD CULTURE
                </h2>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                    lineHeight: 1.85,
                  }}
                >
                  Based in London, I review restaurants, cafes, and food experiences through
                  the lens of a quality engineer. My background in software quality assurance
                  gives me a structured, analytical approach that brings something different
                  to food criticism.
                </p>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{
                    fontFamily: "'Special Elite', Georgia, serif",
                    color: 'var(--color-text)',
                    lineHeight: 1.85,
                  }}
                >
                  I originally published these audits on LinkedIn, where they found an audience
                  among people who appreciated a more rigorous take on the dining experience.
                  This site is where the series lives in full.
                </p>
                <Link href="/reviews" className="btn-primary">
                  READ THE AUDITS
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section
        className="py-16 px-8 text-center"
        style={{ backgroundColor: 'var(--color-dark)' }}
      >
        <ScrollReveal>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--color-white)',
              letterSpacing: '0.04em',
            }}
          >
            START READING
          </h2>
          <p
            className="mb-8 text-base opacity-60"
            style={{
              fontFamily: "'Special Elite', Georgia, serif",
              color: 'var(--color-cream)',
            }}
          >
            Three audits and counting. More coming soon.
          </p>
          <Link href="/reviews" className="btn-ghost">
            VIEW ALL REVIEWS
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
