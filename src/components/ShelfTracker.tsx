import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { ShelfItem, ReadingStatus } from '../types';
import { Library, Plus, Star, BookOpen, Film, Compass, Trash2, CheckCircle2, Clock, Check } from 'lucide-react';

export const ShelfTracker: React.FC = () => {
  const { shelf, saveShelfItem, deleteShelfItem, setIsShelfOpen } = useBlog();

  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'to-read' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'book' | 'video' | 'philosophy'>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New item form
  const [newTitle, setNewTitle] = useState('');
  const [newCreator, setNewCreator] = useState('');
  const [newCategory, setNewCategory] = useState<'book' | 'video' | 'philosophy'>('book');
  const [newStatus, setNewStatus] = useState<ReadingStatus>('reading');
  const [newProgress, setNewProgress] = useState(0);
  const [newRating, setNewRating] = useState<number | ''>('');
  const [newNotes, setNewNotes] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: ShelfItem = {
      id: `shelf-${Date.now()}`,
      title: newTitle.trim(),
      creator: newCreator.trim() || 'Unknown',
      category: newCategory,
      status: newStatus,
      progressPercent: Number(newProgress) || 0,
      rating: newRating === '' ? undefined : Number(newRating),
      notes: newNotes.trim() || undefined
    };

    saveShelfItem(item);
    setNewTitle('');
    setNewCreator('');
    setNewNotes('');
    setNewProgress(0);
    setNewRating('');
    setIsAdding(false);
  };

  const handleStatusChange = (item: ShelfItem, status: ReadingStatus) => {
    saveShelfItem({
      ...item,
      status,
      progressPercent: status === 'completed' ? 100 : item.progressPercent
    });
  };

  const handleProgressChange = (item: ShelfItem, delta: number) => {
    const updated = Math.min(100, Math.max(0, (item.progressPercent || 0) + delta));
    saveShelfItem({
      ...item,
      progressPercent: updated,
      status: updated === 100 ? 'completed' : item.status === 'to-read' ? 'reading' : item.status
    });
  };

  const filteredItems = shelf.filter(item => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesTab && matchesCategory;
  });

  return (
    <div className="py-8 border-b border-stone-200 dark:border-stone-800 mb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block mb-1">
            Personal Canon & Horizon
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 dark:text-stone-100">
            Reading Shelf & Media Queue
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 dark:text-stone-400 mt-1">
            Active tracking for books, cinema, and primary philosophical literature.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAdding ? 'Close Drawer' : 'Add to Shelf'}</span>
        </button>
      </div>

      {/* Add New Item Drawer */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="p-6 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 mb-8 space-y-4">
          <div className="flex items-center justify-between border-b border-inherit pb-3">
            <span className="text-xs uppercase tracking-widest font-mono font-semibold">
              Enlist New Work
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title of book, film, or treatise..."
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Author / Director</label>
              <input
                type="text"
                value={newCreator}
                onChange={(e) => setNewCreator(e.target.value)}
                placeholder="Author, Director, or Philosopher..."
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Domain Medium</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-sans"
              >
                <option value="book">Book</option>
                <option value="video">Film / Cinema</option>
                <option value="philosophy">Philosophy Text</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Reading / Watch Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-sans"
              >
                <option value="reading">Currently Reading / Exploring</option>
                <option value="to-read">In Queue (Want to Read)</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-stone-500 mb-1">Personal Rating (Optional)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="5"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="5.0"
                className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-stone-500 mb-1">Reflections / Reading Intent</label>
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Why this work? Specific chapters or ideas being examined..."
              className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif italic"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer"
            >
              Save to Shelf
            </button>
          </div>
        </form>
      )}

      {/* Filter Toolbar (Segmented Controls) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4 mb-6">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            All Shelf ({shelf.length})
          </button>
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'reading'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Currently Exploring ({shelf.filter(s => s.status === 'reading').length})
          </button>
          <button
            onClick={() => setActiveTab('to-read')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'to-read'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Queue ({shelf.filter(s => s.status === 'to-read').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            Completed ({shelf.filter(s => s.status === 'completed').length})
          </button>
        </div>

        {/* Category Pills/Buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`cursor-pointer ${categoryFilter === 'all' ? 'font-bold text-stone-900 dark:text-stone-100 underline' : 'text-stone-500'}`}
          >
            All Media
          </button>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <button
            onClick={() => setCategoryFilter('book')}
            className={`cursor-pointer ${categoryFilter === 'book' ? 'font-bold text-stone-900 dark:text-stone-100 underline' : 'text-stone-500'}`}
          >
            Books
          </button>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <button
            onClick={() => setCategoryFilter('video')}
            className={`cursor-pointer ${categoryFilter === 'video' ? 'font-bold text-stone-900 dark:text-stone-100 underline' : 'text-stone-500'}`}
          >
            Cinema
          </button>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
          <button
            onClick={() => setCategoryFilter('philosophy')}
            className={`cursor-pointer ${categoryFilter === 'philosophy' ? 'font-bold text-stone-900 dark:text-stone-100 underline' : 'text-stone-500'}`}
          >
            Philosophy
          </button>
        </div>

      </div>

      {/* Shelf Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800">
          <Library className="w-8 h-8 text-stone-400 mx-auto mb-2 stroke-1" />
          <p className="text-sm font-serif italic text-stone-600 dark:text-stone-400">
            No items in this shelf sector. Click "Add to Shelf" to begin cataloging.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
            >
              <div>
                {/* Header line */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                  <div className="flex items-center gap-1.5 uppercase">
                    {item.category === 'book' && <BookOpen className="w-3 h-3" />}
                    {item.category === 'video' && <Film className="w-3 h-3" />}
                    {item.category === 'philosophy' && <Compass className="w-3 h-3" />}
                    <span>{item.category}</span>
                  </div>

                  <button
                    onClick={() => deleteShelfItem(item.id)}
                    className="p-1 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove from shelf"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Title & Creator */}
                <h3 className="text-lg font-serif font-medium text-stone-900 dark:text-stone-100 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-sans mb-3">
                  {item.creator}
                </p>

                {/* Personal Notes */}
                {item.notes && (
                  <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 p-2.5 bg-stone-50 dark:bg-stone-800/60 border-l border-stone-300 dark:border-stone-700 mb-4 leading-relaxed">
                    "{item.notes}"
                  </p>
                )}
              </div>

              {/* Progress & Status Actions */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                    <span>Progress</span>
                    <span className="tabular-nums font-semibold">{item.progressPercent || 0}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-stone-800 dark:bg-stone-200 transition-all duration-300"
                      style={{ width: `${item.progressPercent || 0}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-1.5 text-[10px] font-mono">
                    <button
                      onClick={() => handleProgressChange(item, -10)}
                      className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 cursor-pointer"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => handleProgressChange(item, 10)}
                      className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 cursor-pointer"
                    >
                      +10%
                    </button>
                  </div>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {item.rating && (
                      <div className="flex items-center gap-1 text-xs font-mono font-medium text-stone-800 dark:text-stone-200">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status !== 'completed' ? (
                      <button
                        onClick={() => handleStatusChange(item, 'completed')}
                        className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark Finished</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Finished</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
