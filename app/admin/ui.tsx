"use client";

import type { Review } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';

type ReviewFormState = {
  title: string;
  dek: string;
  venue: string;
  location: string;
  rating: string;
  category: string;
  image: string;
  tags: string;
  body: string;
};

const emptyForm: ReviewFormState = {
  title: '',
  dek: '',
  venue: '',
  location: '',
  rating: '',
  category: '',
  image: '',
  tags: '',
  body: '',
};

function reviewToForm(review: Review): ReviewFormState {
  return {
    title: review.title,
    dek: review.dek,
    venue: review.venue,
    location: review.location,
    rating: String(review.rating),
    category: review.category,
    image: review.image,
    tags: review.tags.join(', '),
    body: review.body,
  };
}

function payloadFromForm(form: ReviewFormState) {
  return {
    title: form.title,
    dek: form.dek,
    venue: form.venue,
    location: form.location,
    rating: Number(form.rating),
    category: form.category,
    image: form.image,
    tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
    body: form.body,
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="font-ui text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">{label}</span>
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-[3px] border border-border-muted bg-white/80 px-4 py-3 font-serif text-sm outline-none transition focus:border-primary" />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full rounded-[3px] border border-border-muted bg-white/80 px-4 py-3 font-serif text-sm leading-7 outline-none transition focus:border-primary" />;
}

function ReviewForm({
  form,
  setForm,
  submitLabel,
  onSubmit,
}: {
  form: ReviewFormState;
  setForm: React.Dispatch<React.SetStateAction<ReviewFormState>>;
  submitLabel: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const update = (key: keyof ReviewFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded-[6px] bg-blush p-5 sm:p-8">
      <Field label="Review title"><TextInput required value={form.title} onChange={update('title')} placeholder="Review title" /></Field>
      <Field label="Short summary"><TextInput required value={form.dek} onChange={update('dek')} placeholder="Short summary" /></Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Venue"><TextInput required value={form.venue} onChange={update('venue')} placeholder="Venue" /></Field>
        <Field label="Location"><TextInput required value={form.location} onChange={update('location')} placeholder="Location" /></Field>
        <Field label="Rating"><TextInput required type="number" step="0.1" min="0" max="5" value={form.rating} onChange={update('rating')} placeholder="Rating" /></Field>
        <Field label="Category"><TextInput required value={form.category} onChange={update('category')} placeholder="Category" /></Field>
      </div>

      <Field label="Image URL"><TextInput required value={form.image} onChange={update('image')} placeholder="Image URL" /></Field>
      <Field label="Tags"><TextInput value={form.tags} onChange={update('tags')} placeholder="tags, comma, separated" /></Field>
      <Field label="Full review"><TextArea required rows={9} value={form.body} onChange={update('body')} placeholder="Full review" /></Field>

      <button className="btn-primary justify-self-start" type="submit">{submitLabel}</button>
    </form>
  );
}

export default function AdminForm({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [tab, setTab] = useState<'publish' | 'edit'>('publish');
  const [msg, setMsg] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [publishForm, setPublishForm] = useState<ReviewFormState>(emptyForm);
  const [editing, setEditing] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState<ReviewFormState>(emptyForm);

  async function loadReviews() {
    const response = await fetch('/api/reviews');
    const data = await response.json();
    setReviews(data);
  }

  useEffect(() => {
    if (authed) void loadReviews();
  }, [authed]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    const response = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
    setAuthed(response.ok);
    setMsg(response.ok ? 'Unlocked.' : 'Wrong password.');
  }

  async function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payloadFromForm(publishForm)),
    });
    const data = await response.json();
    setMsg(response.ok ? `Published: /reviews/${data.slug}` : data.error || 'Failed');
    if (response.ok) {
      setPublishForm(emptyForm);
      await loadReviews();
    }
  }

  async function saveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const response = await fetch(`/api/reviews/${editing.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payloadFromForm(editForm)),
    });
    const data = await response.json();
    setMsg(response.ok ? `Saved changes: /reviews/${data.slug}` : data.error || 'Failed');
    if (response.ok) {
      setEditing(data);
      setEditForm(reviewToForm(data));
      await loadReviews();
    }
  }

  function startEditing(review: Review) {
    setEditing(review);
    setEditForm(reviewToForm(review));
    setMsg(`Editing: ${review.title}`);
  }

  const activeReviewTitle = useMemo(() => editing?.title || 'Select a review to edit', [editing]);

  if (!authed) {
    return (
      <form onSubmit={login} className="mt-10 rounded-[6px] bg-blush p-5 sm:p-8">
        <Field label="Admin password"><TextInput name="password" type="password" /></Field>
        <button className="btn-primary mt-5" type="submit">UNLOCK EDITOR</button>
        <p className="mt-4 font-serif text-sm text-text-muted">{msg}</p>
      </form>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        {[
          ['publish', 'PUBLISH NEW'],
          ['edit', 'EDIT EXISTING'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key as 'publish' | 'edit')}
            className={`rounded-[3px] border px-5 py-3 font-ui text-xs uppercase tracking-widest transition ${tab === key ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-cream'}`}
            style={{ borderColor: 'var(--color-border)' }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'publish' ? (
        <ReviewForm form={publishForm} setForm={setPublishForm} submitLabel="PUBLISH REVIEW" onSubmit={publish} />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <section className="rounded-[6px] bg-white p-5 shadow-card">
            <h2 className="font-display text-3xl tracking-wide text-dark">EXISTING POSTS</h2>
            <div className="mt-5 grid gap-3">
              {reviews.map((review) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => startEditing(review)}
                  className="rounded-[3px] border border-border-muted p-4 text-left transition hover:border-primary hover:bg-cream"
                >
                  <span className="block font-display text-2xl leading-none tracking-wide text-dark">{review.title}</span>
                  <span className="mt-2 block font-ui text-[0.65rem] uppercase tracking-widest text-text-muted">{review.venue} · {review.location}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-4xl tracking-wide text-dark">{activeReviewTitle}</h2>
            {editing ? (
              <ReviewForm form={editForm} setForm={setEditForm} submitLabel="SAVE CHANGES" onSubmit={saveEdit} />
            ) : (
              <div className="mt-8 rounded-[6px] bg-blush p-8 font-serif text-text-muted">Choose an existing post from the list to edit it.</div>
            )}
          </section>
        </div>
      )}

      <p className="mt-5 font-serif text-sm text-text-muted">{msg}</p>
    </div>
  );
}
