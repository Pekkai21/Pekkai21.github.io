import React from 'react';
import { Post } from '../types';
import { useBlog } from '../context/BlogContext';
import { formatDate, getCategoryLabel } from '../utils/helpers';
import { ArrowUpRight, BookOpen, Bookmark } from 'lucide-react';

interface HeroFeaturedProps {
  post: Post;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ post }) => {
  const { openReader, bookmarks, toggleBookmark } = useBlog();
  const isBookmarked = bookmarks.includes(post.id);

  return (
    <article className="border-b border-stone-200 dark:border-stone-800 pb-12 mb-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Visual focal anchor */}
        <div className="w-full lg:w-7/12 relative group cursor-pointer overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
          onClick={() => openReader(post.id)}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-80 lg:h-full min-h-[380px] object-cover transition-transform duration-700 group-hover:scale-102"
              onError={(e) => {
                // Resilient CSS fallback
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}

          {/* Styled fallback container */}
          <div
            className={`w-full h-full min-h-[380px] p-8 flex-col justify-between bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950 ${
              post.coverImage ? 'hidden' : 'flex'
            }`}
          >
            <div className="text-xs uppercase tracking-widest text-stone-500 font-mono">
              CURATED ESSAY · {post.date}
            </div>
            <div>
              <BookOpen className="w-12 h-12 text-stone-400 stroke-1 mb-4" />
              <p className="font-serif italic text-2xl text-stone-800 dark:text-stone-200">
                "{post.excerpt.slice(0, 110)}..."
              </p>
            </div>
            <div className="text-xs text-stone-500 font-serif">
              Marginalia Archives
            </div>
          </div>

          {/* Quiet hover badge */}
          <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-xs px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read dispatch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Right Column: Editorial Typographic Composition */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div>
            {/* Top kicker and unboxed metadata */}
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-3 font-sans">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{getCategoryLabel(post.category)}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(post.id);
                }}
                className="p-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark entry'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-stone-800 dark:fill-stone-200' : ''}`} />
              </button>
            </div>

            {/* Dominant Headline */}
            <h1
              onClick={() => openReader(post.id)}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-900 dark:text-stone-100 hover:text-stone-700 dark:hover:text-stone-300 transition-colors cursor-pointer tracking-tight leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-serif italic mb-6 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Excerpt with drop cap */}
            <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed mb-6 drop-cap">
              {post.excerpt}
            </p>

            {/* Domain-specific highlight: Central Thesis or Quote */}
            {post.centralThesis && (
              <div className="p-4 bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 mb-6">
                <span className="block text-[11px] uppercase tracking-widest text-stone-500 font-mono mb-1">
                  Core Proposition
                </span>
                <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200">
                  "{post.centralThesis}"
                </p>
              </div>
            )}

            {post.favoriteQuote && (
              <div className="p-4 bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 mb-6">
                <span className="block text-[11px] uppercase tracking-widest text-stone-500 font-mono mb-1">
                  Marginalia Note
                </span>
                <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200">
                  "{post.favoriteQuote}"
                </p>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              {post.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span>#{tag}</span>
                  {i < post.tags.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => openReader(post.id)}
              className="text-xs uppercase tracking-widest font-semibold text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full Entry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};
