export type Review = { id: string; slug: string; title: string; dek: string; venue: string; location: string; rating: number; category: string; date: string; image: string; tags: string[]; body: string; };
export type ReviewInput = Omit<Review, 'id' | 'slug' | 'date'> & { slug?: string; date?: string };
