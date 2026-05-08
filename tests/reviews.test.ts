import { describe, expect, it } from 'vitest'; import { slugify } from '@/lib/reviews';
describe('review utilities', () => { it('creates clean slugs', () => { expect(slugify('Street Food & Chaat!')).toBe('street-food-and-chaat'); }); });
