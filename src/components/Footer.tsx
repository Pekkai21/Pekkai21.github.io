import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Database, ArrowUp, Library } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setIsExportImportOpen,
    setIsShelfOpen,
    setActiveCategory,
    closeReader
  } = useBlog();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950 py-12 text-stone-600 dark:text-stone-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
              Marginalia
            </div>
            <p className="text-xs font-serif italic text-stone-500 max-w-md">
              A private journal and public chronicle of daily reflections, literary reviews, cinema analyses, and philosophical inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => {
                closeReader();
                setIsShelfOpen(false);
                setActiveCategory('daily');
                scrollToTop();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Daily Life
            </button>
            <button
              onClick={() => {
                closeReader();
                setIsShelfOpen(false);
                setActiveCategory('book');
                scrollToTop();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Book Reviews
            </button>
            <button
              onClick={() => {
                closeReader();
                setIsShelfOpen(false);
                setActiveCategory('video');
                scrollToTop();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Cinema & Video
            </button>
            <button
              onClick={() => {
                closeReader();
                setIsShelfOpen(false);
                setActiveCategory('philosophy');
                scrollToTop();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Philosophy
            </button>
            <button
              onClick={() => {
                closeReader();
                setIsShelfOpen(true);
                scrollToTop();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Library className="w-3.5 h-3.5" />
              <span>Media Shelf</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} Marginalia & Mind. Published with mindful typography and zero algorithmic tracking.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExportImportOpen(true)}
              className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Backup & Portability</span>
            </button>

            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
