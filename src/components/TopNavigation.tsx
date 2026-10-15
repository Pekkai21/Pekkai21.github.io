import React from 'react';
import { useBlog } from '../context/BlogContext';
import { PostCategory } from '../types';
import { PenLine, Library, Bookmark, ArrowLeft } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    activePostId,
    closeReader,
    openEditor,
    isShelfOpen,
    setIsShelfOpen,
    bookmarks
  } = useBlog();

  const handleCategoryClick = (cat: PostCategory | 'all') => {
    if (activePostId) closeReader();
    if (isShelfOpen) setIsShelfOpen(false);
    setActiveCategory(cat);
  };

  const handleShelfToggle = () => {
    if (activePostId) closeReader();
    setIsShelfOpen(!isShelfOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          {activePostId && (
            <button
              onClick={closeReader}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors cursor-pointer"
              title="Return to index"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Index</span>
            </button>
          )}
          <button
            onClick={() => {
              if (activePostId) closeReader();
              if (isShelfOpen) setIsShelfOpen(false);
              setActiveCategory('all');
            }}
            className="text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:text-stone-700 dark:hover:text-stone-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Marginalia
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !isShelfOpen && activeCategory === 'all'
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            All Dispatches
          </button>
          
          <button
            onClick={() => handleCategoryClick('daily')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !isShelfOpen && activeCategory === 'daily'
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Daily Life
          </button>

          <button
            onClick={() => handleCategoryClick('book')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !isShelfOpen && activeCategory === 'book'
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Book Reviews
          </button>

          <button
            onClick={() => handleCategoryClick('video')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !isShelfOpen && activeCategory === 'video'
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Cinema & Video
          </button>

          <button
            onClick={() => handleCategoryClick('philosophy')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !isShelfOpen && activeCategory === 'philosophy'
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Philosophy
          </button>

          <button
            onClick={handleShelfToggle}
            className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              isShelfOpen
                ? 'text-stone-900 dark:text-stone-50 font-semibold underline underline-offset-8 decoration-stone-900 dark:decoration-stone-100'
                : 'hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Reading Shelf</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openEditor()}
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 dark:text-stone-100 bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-none border border-stone-300 dark:border-stone-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write Entry</span>
          </button>
        </div>

      </div>

      {/* Mobile Secondary Category Scroll */}
      <div className="md:hidden flex items-center gap-4 px-4 py-2.5 overflow-x-auto border-t border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-600 dark:text-stone-400 no-scrollbar">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`whitespace-nowrap shrink-0 ${!isShelfOpen && activeCategory === 'all' ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryClick('daily')}
          className={`whitespace-nowrap shrink-0 ${!isShelfOpen && activeCategory === 'daily' ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          Daily Life
        </button>
        <button
          onClick={() => handleCategoryClick('book')}
          className={`whitespace-nowrap shrink-0 ${!isShelfOpen && activeCategory === 'book' ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          Books
        </button>
        <button
          onClick={() => handleCategoryClick('video')}
          className={`whitespace-nowrap shrink-0 ${!isShelfOpen && activeCategory === 'video' ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          Cinema
        </button>
        <button
          onClick={() => handleCategoryClick('philosophy')}
          className={`whitespace-nowrap shrink-0 ${!isShelfOpen && activeCategory === 'philosophy' ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          Philosophy
        </button>
        <button
          onClick={handleShelfToggle}
          className={`whitespace-nowrap shrink-0 ${isShelfOpen ? 'text-stone-900 dark:text-stone-100 font-bold' : ''}`}
        >
          Shelf
        </button>
      </div>
    </header>
  );
};
