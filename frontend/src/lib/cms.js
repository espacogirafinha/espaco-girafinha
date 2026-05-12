import { supabase, isSupabaseConfigured } from './supabase';
import {
  packages as fallbackPackages,
  galleryImages as fallbackGalleryImages,
  faqs as fallbackFaqs,
  testimonials as fallbackTestimonials,
} from '../data/mock';
import { blogPosts as fallbackBlogPosts } from '../data/blog';

const TABLES = {
  packages: 'cms_packages',
  gallery: 'cms_gallery_images',
  blog: 'cms_blog_posts',
  faqs: 'cms_faqs',
  testimonials: 'cms_testimonials',
};

const fallbackContent = {
  packages: fallbackPackages,
  gallery: fallbackGalleryImages,
  blog: fallbackBlogPosts,
  faqs: fallbackFaqs,
  testimonials: fallbackTestimonials,
};

const orderBy = (items) =>
  [...items].sort((a, b) => (a.sort_order ?? a.id ?? 0) - (b.sort_order ?? b.id ?? 0));

export const normalizePackage = (item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  originalPrice: item.original_price ?? item.originalPrice ?? '',
  isPromotion: item.is_promotion ?? item.isPromotion ?? false,
  popular: item.popular ?? false,
  schedules: item.schedules ?? [],
  includes: item.includes ?? [],
  extras: item.extras ?? [],
  notes: item.notes ?? [],
  sort_order: item.sort_order ?? item.id ?? 0,
  is_published: item.is_published ?? true,
});

export const normalizeGalleryImage = (item) => ({
  id: item.id,
  src: item.src,
  alt: item.alt,
  category: item.category,
  sort_order: item.sort_order ?? item.id ?? 0,
  is_published: item.is_published ?? true,
});

export const normalizeBlogPost = (item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  excerpt: item.excerpt,
  image: item.image,
  imageAlt: item.image_alt ?? item.imageAlt ?? '',
  date: item.date,
  readTime: item.read_time ?? item.readTime ?? '5 min',
  category: item.category,
  tags: item.tags ?? [],
  content: item.content,
  sort_order: item.sort_order ?? item.id ?? 0,
  is_published: item.is_published ?? true,
});

export const normalizeFaq = (item) => ({
  id: item.id,
  question: item.question,
  answer: item.answer,
  sort_order: item.sort_order ?? item.id ?? 0,
  is_published: item.is_published ?? true,
});

export const normalizeTestimonial = (item) => ({
  id: item.id,
  text: item.text,
  author: item.author,
  location: item.location,
  rating: item.rating ?? 5,
  sort_order: item.sort_order ?? item.id ?? 0,
  is_published: item.is_published ?? true,
});

const normalizers = {
  packages: normalizePackage,
  gallery: normalizeGalleryImage,
  blog: normalizeBlogPost,
  faqs: normalizeFaq,
  testimonials: normalizeTestimonial,
};

export const getFallbackContent = () => ({
  packages: orderBy(fallbackPackages.map(normalizePackage)),
  gallery: orderBy(fallbackGalleryImages.map(normalizeGalleryImage)),
  blog: orderBy(fallbackBlogPosts.map(normalizeBlogPost)),
  faqs: orderBy(fallbackFaqs.map(normalizeFaq)),
  testimonials: orderBy(fallbackTestimonials.map(normalizeTestimonial)),
});

export async function fetchCmsCollection(key, { admin = false } = {}) {
  if (!isSupabaseConfigured) return orderBy(fallbackContent[key].map(normalizers[key]));

  let query = supabase.from(TABLES[key]).select('*').order('sort_order', { ascending: true });
  if (!admin) query = query.eq('is_published', true);

  const { data, error } = await query;
  if (error) throw error;
  if (!admin && (!data || data.length === 0)) {
    return orderBy(fallbackContent[key].map(normalizers[key]));
  }
  return orderBy((data ?? []).map(normalizers[key]));
}

export async function fetchSiteContent() {
  if (!isSupabaseConfigured) return getFallbackContent();

  const entries = await Promise.all(
    Object.keys(TABLES).map(async (key) => [key, await fetchCmsCollection(key)])
  );
  return Object.fromEntries(entries);
}

export async function fetchAdminContent() {
  const entries = await Promise.all(
    Object.keys(TABLES).map(async (key) => [key, await fetchCmsCollection(key, { admin: true })])
  );
  return Object.fromEntries(entries);
}

export const tableForKey = (key) => TABLES[key];
