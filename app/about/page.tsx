import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "ABOUT — SWATI'S FOOD REVIEW",
  description: "SWATI KHARBANDA — Quality Engineer & Food Auditor based in London.",
};

const experience = [
  'Quality Engineer with experience across digital product teams.',
  'Product Engineer in the Waitrose Digital team at John Lewis Partnership.',
  'Specialises in test strategy, process improvement, and quality advocacy.',
  'Has written about Quality Through Collaboration and Zero Defect culture.',
  'Active voice in the quality engineering community, sharing certifications and industry insights on LinkedIn.',
  'Certified across automated visual testing, API testing, and test leadership topics.',
];

const givesReaders = [
  "Honest, structured food reviews from a quality engineer's perspective.",
  'The Food Audit framework: product integrity, operational flow, sensory QC, atmosphere, and value.',
  'A growing archive of London and beyond dining experiences.',
  'An editorial alternative to star-rating apps — for people who care about the details.',
];

export default function AboutPage() {
  return (
    <>
      <section className="px-5 py-20 text-center sm:px-8 md:py-28" style={{ backgroundColor: 'var(--color-primary)' }}>
        <ScrollReveal>
          <p className="mb-4 font-ui text-xs uppercase tracking-widest text-cream opacity-70">THE FOOD AUDIT</p>
          <h1 className="font-display text-[4.5rem] leading-[0.9] tracking-[0.04em] text-white sm:text-8xl md:text-[9rem]">
            SWATI<br />KHARBANDA
          </h1>
          <p className="mt-5 font-serif text-base tracking-wide text-cream opacity-85 md:text-xl">
            Quality Engineer · Food Auditor · London
          </p>
        </ScrollReveal>
      </section>

      <section className="section-cream px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <ScrollReveal>
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[8px] shadow-card hover-zoom">
              <Image
                src="/swati-profile.jpg"
                alt="SWATI KHARBANDA profile portrait"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-center"
                priority
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="mb-3 font-ui text-xs uppercase tracking-[0.25em] text-primary">London, England · 540 LinkedIn followers</p>
            <h2 className="mb-6 font-display text-5xl leading-none tracking-wide text-dark md:text-7xl">THE REVIEWER</h2>
            <div className="grid gap-5 font-serif text-base leading-8 text-text-muted md:text-lg md:leading-9">
              <p>
                Swati is a Product Engineer in the Waitrose Digital team at John Lewis Partnership, specialising in quality.
                Her work focuses on creating seamless and innovative digital experiences — ensuring every user journey is
                rigorously tested, every edge case considered, and every release meets the highest standard.
              </p>
              <p>
                Her professional philosophy is simple: “My strength is paying attention to minute details — in software,
                in process, and now in food.”
              </p>
              <p>
                The Food Audit is Swati&apos;s passion project. Applying a quality-engineering mindset to food culture, she
                visits local restaurants, cafes, and food spots with the same lens she uses at work: product integrity,
                operational flow, sensory quality control, and value.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-blush px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-[8px] bg-white p-6 shadow-card sm:p-8">
              <h2 className="mb-6 font-display text-5xl leading-none tracking-wide text-primary md:text-6xl">QUALITY ENGINEERING</h2>
              <ul className="grid gap-4">
                {experience.map((item) => (
                  <li key={item} className="border-b border-border-muted pb-4 font-serif text-sm leading-7 text-text-muted last:border-b-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="rounded-[8px] bg-white p-6 shadow-card sm:p-8">
              <h2 className="mb-6 font-display text-5xl leading-none tracking-wide text-primary md:text-6xl">THE FOOD AUDIT</h2>
              <p className="mb-6 font-serif text-base leading-8 text-text-muted">
                The result is a structured, honest review format that goes far beyond a star rating. Each post examines
                what worked, what broke down, and what the venue experience really delivers.
              </p>
              <ul className="grid gap-4">
                {givesReaders.map((item) => (
                  <li key={item} className="border-b border-border-muted pb-4 font-serif text-sm leading-7 text-text-muted last:border-b-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 md:py-20" style={{ backgroundColor: 'var(--color-dark)' }}>
        <ScrollReveal>
          <h2 className="mb-6 font-display text-5xl leading-none tracking-wide text-white md:text-7xl">READ THE FOOD AUDIT</h2>
          <p className="mx-auto mb-8 max-w-2xl font-serif text-base leading-8 text-cream opacity-75">
            Start with Swati&apos;s structured reviews of The Moon, Dulcis Gelato & Pasticcini, and Daisy&apos;s in the Park.
          </p>
          <Link href="/reviews" className="btn-primary">READ THE REVIEWS</Link>
        </ScrollReveal>
      </section>
    </>
  );
}
