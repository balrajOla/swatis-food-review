import { isAdmin } from '@/lib/auth';
import AdminForm from './ui';

export const metadata = {
  title: "ADMIN — SWATI'S FOOD REVIEW",
  description: 'Private publishing and editing for THE FOOD AUDIT.',
};

export default async function Admin() {
  const ok = await isAdmin();

  return (
    <main className="section-cream mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-18">
      <p className="font-ui text-xs uppercase tracking-[0.3em] text-primary">Private publishing</p>
      <h1 className="mt-4 font-display text-6xl leading-none tracking-wide text-dark md:text-8xl">PUBLISH & EDIT REVIEWS</h1>
      <p className="mt-4 max-w-2xl font-serif text-base leading-8 text-text-muted">
        Admin access lets Swati publish new Food Audit reviews and update existing posts without touching the codebase.
      </p>
      <AdminForm initialAuthed={ok} />
    </main>
  );
}
