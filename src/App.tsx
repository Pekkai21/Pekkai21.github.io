/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { TopNavigation } from './components/TopNavigation';
import { HeroFeatured } from './components/HeroFeatured';
import { PostCard } from './components/PostCard';
import { PostDetailReader } from './components/PostDetailReader';
import { ShelfTracker } from './components/ShelfTracker';
import { EditorStudioModal } from './components/EditorStudioModal';
import { ExportImportModal } from './components/ExportImportModal';
import { Footer } from './components/Footer';
import { Search, X, SlidersHorizontal, BookOpen, PenLine, Star, Sparkles } from 'lucide-react';
import { PostCategory } from './types';

const BlogMainView: React.FC = () => {
  const {
    posts,
    activePost,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    isShelfOpen,
    openEditor
  } = useBlog();

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      if (activeCategory !== 'all' && post.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inSubtitle = post.subtitle?.toLowerCase().includes(q);
        const inExcerpt = post.excerpt.toLowerCase().includes(q);
        const inContent = post.content.toLowerCase().includes(q);
        const inAuthor = post.bookAuthor?.toLowerCase().includes(q);
        const inDirector = post.videoDirector?.toLowerCase().includes(q);
        const inSchool = post.philosophicalSchool?.toLowerCase().includes(q);
        const inTags = post.tags.some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inSubtitle && !inExcerpt && !inContent && !inAuthor && !inDirector && !inSchool && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [posts, activeCategory, selectedTag, searchQuery]);

  // If in Reader view, render the reader component
  if (activePost) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <PostDetailReader post={activePost} />
        <EditorStudioModal />
        <ExportImportModal />
      </div>
    );
  }

  // Identify featured hero dispatch (first featured post or first post in list)
  const heroPost = !searchQuery.trim() && !selectedTag && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const secondaryPosts = heroPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors">
      <TopNavigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* If Reading Shelf is active, show the Shelf Tracker view */}
        {isShelfOpen ? (
          <ShelfTracker />
        ) : (
          <>
            {/* Filter and Search Bar Ribbon */}
            <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
              
              {/* Category Segmented Tabs (Interactive Filter Controls) */}
              <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs overflow-x-auto no-scrollbar">
                {(['all', 'daily', 'book', 'video', 'philosophy'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeCategory === cat
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    {cat === 'all'
                      ? 'All Dispatches'
                      : cat === 'daily'
                      ? 'Daily Life'
                      : cat === 'book'
                      ? 'Book Reviews'
                      : cat === 'video'
                      ? 'Cinema & Video'
                      : 'Philosophy'}
                  </button>
                ))}
              </div>

              {/* Search input & Tag clearing */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search entries, authors, concepts..."
                    className="w-full pl-9 pr-8 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-stone-500 rounded-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {selectedTag && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-200/80 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300">
                    <span>#{selectedTag}</span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Curated Lead Story Marquee (Hero) */}
            {heroPost && <HeroFeatured post={heroPost} />}

            {/* Department Title & Count */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
                  {searchQuery.trim()
                    ? `Search Results for "${searchQuery}"`
                    : selectedTag
                    ? `Tagged with #${selectedTag}`
                    : activeCategory === 'all'
                    ? 'Recent Chronicle & Inquiries'
                    : `${activeCategory.toUpperCase()} ARCHIVE`}
                </span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>

              {/* Tag quick filters */}
              <div className="hidden lg:flex items-center gap-3 text-xs text-stone-500">
                <span className="font-mono text-[11px] uppercase">Index tags:</span>
                {allTags.slice(0, 6).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer transition-colors ${
                      selectedTag === tag ? 'font-semibold text-stone-900 dark:text-stone-100 underline' : ''
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Articles */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 border border-stone-200 dark:border-stone-800 p-8 my-8">
                <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3 stroke-1" />
                <h3 className="text-xl font-serif font-medium text-stone-800 dark:text-stone-200 mb-2">
                  No matching dispatches found
                </h3>
                <p className="text-sm font-serif italic text-stone-500 max-w-md mx-auto mb-6">
                  {searchQuery
                    ? `No entries match your search query "${searchQuery}". Try a different keyword or reset filters.`
                    : 'Your journal is ready for new inscriptions.'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {(searchQuery || selectedTag || activeCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTag(null);
                        setActiveCategory('all');
                      }}
                      className="px-4 py-2 text-xs uppercase tracking-wider font-medium border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900 cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  )}
                  <button
                    onClick={() => openEditor()}
                    className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer"
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>Inscribe First Dispatch</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondaryPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}

      </main>

      <Footer />
      <EditorStudioModal />
      <ExportImportModal />
    </div>
  );
};

export default function App() {
  return (
    <BlogProvider>
      <BlogMainView />
    </BlogProvider>
  );
}
