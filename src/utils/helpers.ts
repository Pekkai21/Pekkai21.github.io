import { PostCategory } from '../types';

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return dateString;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getCategoryLabel(category: PostCategory): string {
  switch (category) {
    case 'daily':
      return 'Daily Life';
    case 'book':
      return 'Book Review';
    case 'video':
      return 'Cinema & Video';
    case 'philosophy':
      return 'Philosophy';
    default:
      return category;
  }
}

export function getCategoryKicker(category: PostCategory): string {
  switch (category) {
    case 'daily':
      return 'Daily Reflection';
    case 'book':
      return 'Critical Review';
    case 'video':
      return 'Cinematic Analysis';
    case 'philosophy':
      return 'Philosophical Inquiry';
    default:
      return 'Dispatch';
  }
}
