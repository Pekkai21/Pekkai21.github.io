import React from 'react';
import { Post } from '../types';
import { useBlog } from '../context/BlogContext';
import { formatDate, getCategoryLabel, getCategoryKicker } from '../utils/helpers';
import { Bookmark, Star, Clock, Film, Book, Compass, Sun, ArrowUpRight, Edit3 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  variant?: 'standard' | 'compact';
}

export const PostCard: React.FC<PostCardProps> = ({ post, variant = 'standard' }) => {
  const { openReader, openEditor, bookmarks, toggleBookmark } = useBlog();
  const isBookmarked = bookmarks.includes(post.id);

  const renderCategoryIcon = () => {
    switch (post.category) {
      case 'book':
        return <Book className="w-3.5 h-3.5 text-stone-500" />;
      case 'video':
        return <Film className="w-3.5 h-3.5 text-stone-500" />;
      case 'philosophy':
        return <Compass className="w-3.5 h-3.5 text-stone-500" />;
      case 'daily':
        return <Sun className="w-3.5 h-3.5 text-stone-500" />;
      default:
        return null;
    }
  };

  return (
    <article
      onClick={() => openReader(post.id)}
      className="group relative flex flex-col justify-between bg-stone-50/50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 hover:border-stone-400 dark:hover:border-stone-700 transition-all p-6 cursor-pointer"
    >
      <div>
        {/* Visual Media Header (if present) */}
        {post.coverImage && (
          <div className="relative mb-5 overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-[16/10] border border-stone-200 dark:border-stone-800">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
            {post.category === 'book' && post.bookRating && (
              <div className="absolute bottom-2.5 left-2.5 bg-stone-900/90 text-stone-100 text-xs px-2.5 py-1 flex items-center gap-1 font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{post.bookRating.toFixed(1)}</span>
              </div>
            )}
            {post.category === 'video' && post.videoDuration && (
              <div className="absolute bottom-2.5 left-2.5 bg-stone-900/90 text-stone-100 text-xs px-2.5 py-1 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-stone-300" />
                <span>{post.videoDuration}</span>
              </div>
            )}
          </div>
        )}

        {/* Clean Unboxed Metadata Header (NO PILLS) */}
        <div className="flex items-center justify-between text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400 mb-2.5 font-sans">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
              {renderCategoryIcon()}
              <span>{getCategoryLabel(post.category)}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditor(post.id);
              }}
              className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
              title="Edit entry"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(post.id);
              }}
              className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark entry'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-stone-800 dark:fill-stone-200 text-stone-800 dark:text-stone-200' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors mb-2 leading-snug tracking-tight">
          {post.title}
        </h2>

        {/* Subtitle / Kicker */}
        {post.subtitle && (
          <p className="text-sm font-serif italic text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
            {post.subtitle}
          </p>
        )}

        {/* Domain-specific sub-line */}
        {post.category === 'book' && post.bookAuthor && (
          <div className="text-xs text-stone-600 dark:text-stone-400 font-sans mb-3 flex items-center gap-2">
            <span>By {post.bookAuthor}</span>
            {post.bookYear && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.bookYear}</span>
              </>
            )}
            {post.bookPages && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.bookPages} pp</span>
              </>
            )}
          </div>
        )}

        {post.category === 'video' && post.videoDirector && (
          <div className="text-xs text-stone-600 dark:text-stone-400 font-sans mb-3 flex items-center gap-2">
            <span>Dir. {post.videoDirector}</span>
            {post.videoPlatform && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.videoPlatform}</span>
              </>
            )}
          </div>
        )}

        {post.category === 'philosophy' && post.philosophicalSchool && (
          <div className="text-xs text-stone-600 dark:text-stone-400 font-sans mb-3">
            <span className="font-medium text-stone-800 dark:text-stone-200">Tradition:</span> {post.philosophicalSchool}
          </div>
        )}

        {post.category === 'daily' && post.dailyLocation && (
          <div className="text-xs text-stone-600 dark:text-stone-400 font-sans mb-3">
            <span>{post.dailyLocation}</span>
            {post.dailyMoodWeather && (
              <>
                <span aria-hidden="true"> · </span>
                <span className="italic">{post.dailyMoodWeather}</span>
              </>
            )}
          </div>
        )}

        {/* Excerpt */}
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 mb-6 font-sans">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-1.5">
          <span>{post.readingTimeMinutes} min read</span>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[130px]">#{post.tags[0]}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 font-medium text-stone-800 dark:text-stone-200 group-hover:translate-x-0.5 transition-transform">
          <span>Read</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </article>
  );
};
