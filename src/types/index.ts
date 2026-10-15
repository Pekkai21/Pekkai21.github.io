export type PostCategory = 'daily' | 'book' | 'video' | 'philosophy';

export type ReadingStatus = 'to-read' | 'reading' | 'completed';

export interface TimestampNote {
  time: string; // e.g. "04:12"
  label: string; // e.g. "The Glass sequence begins"
  description?: string;
}

export interface DialecticSection {
  thesis: string;
  antithesis: string;
  synthesis: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: PostCategory;
  date: string; // ISO date "2026-10-14"
  readingTimeMinutes: number;
  featured?: boolean;
  coverImage?: string;
  coverCaption?: string;
  tags: string[];
  excerpt: string;
  content: string; // Markdown or rich formatted prose

  // Book review specific fields
  bookAuthor?: string;
  bookYear?: number;
  bookPages?: number;
  bookRating?: number; // 1.0 to 5.0
  favoriteQuote?: string;
  quoteAttribution?: string;
  spoilers?: boolean;
  spoilerContent?: string;

  // Video / Film specific fields
  videoDirector?: string;
  videoDuration?: string; // e.g. "1h 26m"
  videoPlatform?: string; // e.g. "Criterion Channel", "YouTube", "Cinema"
  videoEmbedUrl?: string;
  videoRating?: number;
  timestamps?: TimestampNote[];

  // Philosophy specific fields
  philosophicalSchool?: string; // e.g. "Stoicism", "Phenomenology", "Existentialism"
  centralThesis?: string;
  dialectic?: DialecticSection;
  primaryReferences?: string[];
  keyConcepts?: { term: string; definition: string }[];

  // Daily life specific fields
  dailyLocation?: string; // e.g. "Shinjuku, Tokyo" or "Home Library, Edinburgh"
  dailyMoodWeather?: string; // e.g. "Early rain, 14°C, quiet morning"
  dailyEpiphany?: string;
}

export interface ShelfItem {
  id: string;
  title: string;
  creator: string; // author or director
  category: 'book' | 'video' | 'philosophy';
  status: ReadingStatus;
  progressPercent?: number;
  notes?: string;
  rating?: number;
  linkUrl?: string;
}

export interface UserHighlight {
  id: string;
  postId: string;
  text: string;
  note?: string;
  createdAt: string;
}

export type ReaderTheme = 'paper' | 'obsidian' | 'sepia' | 'minimal';
export type ReaderFont = 'serif' | 'sans';
export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
