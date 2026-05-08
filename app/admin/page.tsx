import { isAdmin } from '@/lib/auth'; import AdminForm from './ui';
export default async function Admin(){ const ok=await isAdmin(); return <main className="mx-auto max-w-4xl px-5 py-16"><p className="text-xs uppercase tracking-[.35em] text-clay">Private publishing</p><h1 className="mt-5 font-serif text-6xl md:text-8xl">Publish a review</h1><AdminForm initialAuthed={ok}/></main> }
