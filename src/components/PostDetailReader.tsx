import React, { useState, useEffect } from 'react';
import { Post, TimestampNote } from '../types';
import { useBlog } from '../context/BlogContext';
import { formatDate, getCategoryLabel } from '../utils/helpers';
import { MarkdownView } from './MarkdownView';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Edit3,
  Star,
  Clock,
  MapPin,
  CloudSun,
  Quote,
  Sparkles,
  BookOpen,
  Film,
  Compass,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Check,
  Maximize2,
  Minimize2,
  Trash2
} from 'lucide-react';

interface PostDetailReaderProps {
  post: Post;
}

export const PostDetailReader: React.FC<PostDetailReaderProps> = ({ post }) => {
  const {
    closeReader,
    openEditor,
    deletePost,
    bookmarks,
    toggleBookmark,
    readerTheme,
    setReaderTheme,
    readerFont,
    setReaderFont,
    readerFontSize,
    setReaderFontSize
  } = useBlog();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [userMarginNote, setUserMarginNote] = useState('');
  const [savedMarginNotes, setSavedMarginNotes] = useState<string[]>([]);
  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);

  const isBookmarked = bookmarks.includes(post.id);

  // Scroll listener for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load and save user marginalia notes for this post
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`marginalia_notes_${post.id}`);
      if (saved) {
        setSavedMarginNotes(JSON.parse(saved));
      } else {
        setSavedMarginNotes([]);
      }
    } catch {
      setSavedMarginNotes([]);
    }
  }, [post.id]);

  const handleAddMarginNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMarginNote.trim()) return;
    const updated = [userMarginNote.trim(), ...savedMarginNotes];
    setSavedMarginNotes(updated);
    localStorage.setItem(`marginalia_notes_${post.id}`, JSON.stringify(updated));
    setUserMarginNote('');
  };

  const handleRemoveMarginNote = (index: number) => {
    const updated = savedMarginNotes.filter((_, i) => i !== index);
    setSavedMarginNotes(updated);
    localStorage.setItem(`marginalia_notes_${post.id}`, JSON.stringify(updated));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Determine theme styles
  const getThemeContainerClass = () => {
    switch (readerTheme) {
      case 'obsidian':
        return 'bg-[#151413] text-[#E6E2DB] border-stone-800';
      case 'sepia':
        return 'bg-[#F4EEDC] text-[#2C241E] border-[#E2D5BE]';
      case 'minimal':
        return 'bg-white text-stone-900 border-stone-200';
      case 'paper':
      default:
        return 'bg-[#FAF8F5] text-[#221F1C] border-[#E8E2D8]';
    }
  };

  const getSubtleSurfaceClass = () => {
    switch (readerTheme) {
      case 'obsidian':
        return 'bg-[#1F1E1C] border-stone-800 text-stone-300';
      case 'sepia':
        return 'bg-[#EFE5D0] border-[#DFCDB2] text-[#473B2E]';
      case 'minimal':
        return 'bg-stone-50 border-stone-200 text-stone-700';
      case 'paper':
      default:
        return 'bg-[#F2ECE1] border-[#DFD7C8] text-[#3D3730]';
    }
  };

  const getFontFamilyClass = () => {
    return readerFont === 'serif' ? 'font-prose-serif' : 'font-prose-sans';
  };

  const getFontSizeClass = () => {
    switch (readerFontSize) {
      case 'sm':
        return 'text-base leading-relaxed';
      case 'lg':
        return 'text-xl leading-loose';
      case 'xl':
        return 'text-2xl leading-loose';
      case 'md':
      default:
        return 'text-lg leading-relaxed';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeContainerClass()}`}>
      
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-stone-800 dark:bg-stone-200 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Control Bar */}
      {!isDistractionFree && (
        <aside aria-label="Reading controls" className="sticky top-0 z-30 border-b backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-4 transition-colors bg-opacity-95 border-inherit">
          <div className="flex items-center gap-3">
            <button
              onClick={closeReader}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium hover:opacity-70 transition-opacity cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span aria-hidden="true" className="opacity-30">|</span>
            <span className="text-xs tracking-wider uppercase opacity-60 font-sans hidden sm:inline truncate max-w-xs">
              {post.title}
            </span>
          </div>

          {/* Typography & Theme Preferences */}
          <div className="flex items-center gap-4">
            
            {/* Theme Selector */}
            <div className="flex items-center gap-1 p-0.5 rounded border border-stone-400/30 text-xs">
              <button
                onClick={() => setReaderTheme('paper')}
                title="Archival Warm Paper"
                className={`w-5 h-5 rounded-sm transition-all cursor-pointer ${readerTheme === 'paper' ? 'ring-2 ring-stone-600 scale-110' : 'opacity-70'} bg-[#FAF8F5] border border-stone-300`}
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                title="Warm Sepia"
                className={`w-5 h-5 rounded-sm transition-all cursor-pointer ${readerTheme === 'sepia' ? 'ring-2 ring-stone-700 scale-110' : 'opacity-70'} bg-[#F4EEDC] border border-[#DFCDB2]`}
              />
              <button
                onClick={() => setReaderTheme('obsidian')}
                title="Obsidian Dark"
                className={`w-5 h-5 rounded-sm transition-all cursor-pointer ${readerTheme === 'obsidian' ? 'ring-2 ring-stone-300 scale-110' : 'opacity-70'} bg-[#151413] border border-stone-700`}
              />
              <button
                onClick={() => setReaderTheme('minimal')}
                title="Crisp White"
                className={`w-5 h-5 rounded-sm transition-all cursor-pointer ${readerTheme === 'minimal' ? 'ring-2 ring-stone-900 scale-110' : 'opacity-70'} bg-white border border-stone-300`}
              />
            </div>

            {/* Font Toggle */}
            <div className="flex items-center border border-stone-400/30 rounded text-xs font-mono">
              <button
                onClick={() => setReaderFont('serif')}
                className={`px-2 py-0.5 cursor-pointer font-serif ${readerFont === 'serif' ? 'font-bold underline' : 'opacity-60'}`}
                title="Editorial Serif"
              >
                Serif
              </button>
              <button
                onClick={() => setReaderFont('sans')}
                className={`px-2 py-0.5 cursor-pointer font-sans ${readerFont === 'sans' ? 'font-bold underline' : 'opacity-60'}`}
                title="Clean Sans"
              >
                Sans
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono border border-stone-400/30 rounded px-1.5 py-0.5">
              <button
                onClick={() => setReaderFontSize('sm')}
                className={`px-1 cursor-pointer ${readerFontSize === 'sm' ? 'font-bold' : 'opacity-50'}`}
              >
                A-
              </button>
              <button
                onClick={() => setReaderFontSize('md')}
                className={`px-1 cursor-pointer ${readerFontSize === 'md' ? 'font-bold' : 'opacity-50'}`}
              >
                A
              </button>
              <button
                onClick={() => setReaderFontSize('lg')}
                className={`px-1 cursor-pointer ${readerFontSize === 'lg' ? 'font-bold' : 'opacity-50'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark & Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(post.id)}
                className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark dispatch'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                title="Copy dispatch link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => openEditor(post.id)}
                className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                title="Edit this dispatch"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDistractionFree(true)}
                className="p-1 hover:opacity-75 transition-opacity cursor-pointer hidden md:inline-block"
                title="Distraction-free focus mode"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </aside>
      )}

      {/* Floating Exit Distraction-Free */}
      {isDistractionFree && (
        <button
          onClick={() => setIsDistractionFree(false)}
          className="fixed top-4 right-4 z-50 p-2 bg-stone-900 text-stone-100 rounded-full shadow-lg opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
          title="Exit focus mode"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}

      {/* Main Reading Canvas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Article Metadata Kicker */}
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest opacity-60 font-sans mb-4">
            <span className="font-semibold">{getCategoryLabel(post.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl font-serif italic opacity-75 leading-relaxed mb-6">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-xs opacity-60 font-sans">
            {post.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>#{tag}</span>
                {idx < post.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Hero Media Cover (if exists) */}
        {post.coverImage && (
          <div className="mb-12">
            <div className="relative overflow-hidden bg-stone-200 dark:bg-stone-900 border border-inherit">
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[520px] object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {post.coverCaption && (
              <p className="text-xs font-serif italic text-center opacity-60 mt-2.5">
                {post.coverCaption}
              </p>
            )}
          </div>
        )}

        {/* =========================================================================
            DOMAIN SPECIFIC SCORECARDS & PANELS
           ========================================================================= */}

        {/* 1. BOOK REVIEW SCORECARD */}
        {post.category === 'book' && (
          <div className={`p-6 sm:p-8 mb-12 border ${getSubtleSurfaceClass()}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-inherit pb-6 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-1">
                  Literary Dossier
                </span>
                <h3 className="text-xl font-serif font-medium">
                  {post.title}
                </h3>
                <div className="text-sm opacity-80 mt-1 font-sans">
                  {post.bookAuthor && <span>Author: <strong>{post.bookAuthor}</strong></span>}
                  {post.bookYear && <span className="ml-3">Publication: {post.bookYear}</span>}
                  {post.bookPages && <span className="ml-3">Length: {post.bookPages} pages</span>}
                </div>
              </div>

              {post.bookRating && (
                <div className="flex items-center gap-2 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-4 py-2 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{post.bookRating.toFixed(1)} / 5.0</span>
                </div>
              )}
            </div>

            {post.favoriteQuote && (
              <div className="my-6 pl-4 border-l-2 border-stone-500/50">
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-2">
                  Key Passage
                </span>
                <blockquote className="font-serif italic text-lg sm:text-xl leading-relaxed">
                  "{post.favoriteQuote}"
                </blockquote>
                {post.quoteAttribution && (
                  <p className="text-xs opacity-60 font-sans mt-2">
                    — {post.quoteAttribution}
                  </p>
                )}
              </div>
            )}

            {/* Spoilers toggle */}
            {post.spoilerContent && (
              <div className="mt-6 pt-6 border-t border-inherit">
                <button
                  onClick={() => setShowSpoilers(!showSpoilers)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:opacity-75 transition-opacity cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>{showSpoilers ? 'Hide Plot & Climax Spoilers' : 'Reveal In-Depth Narrative Analysis (Contains Spoilers)'}</span>
                  {showSpoilers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showSpoilers && (
                  <div className="mt-4 p-4 bg-stone-900/10 dark:bg-stone-100/10 border border-inherit text-sm font-serif leading-relaxed">
                    {post.spoilerContent}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. CINEMA & VIDEO REVIEW SCORECARD */}
        {post.category === 'video' && (
          <div className={`p-6 sm:p-8 mb-12 border ${getSubtleSurfaceClass()}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-inherit pb-6 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-1">
                  Cinematographic Analysis
                </span>
                <div className="text-sm opacity-80 mt-1 font-sans">
                  {post.videoDirector && <span>Director: <strong>{post.videoDirector}</strong></span>}
                  {post.videoDuration && <span className="ml-3">Duration: {post.videoDuration}</span>}
                  {post.videoPlatform && <span className="ml-3">Medium: {post.videoPlatform}</span>}
                </div>
              </div>

              {post.videoRating && (
                <div className="flex items-center gap-2 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-4 py-2 font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{post.videoRating.toFixed(1)} / 5.0</span>
                </div>
              )}
            </div>

            {/* Chapters / Key Timestamps Table */}
            {post.timestamps && post.timestamps.length > 0 && (
              <div className="mt-4">
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-3">
                  Sequence Breakdown & Timestamps
                </span>
                <div className="divide-y divide-inherit border border-inherit">
                  {post.timestamps.map((ts, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveTimestamp(activeTimestamp === ts.time ? null : ts.time)}
                      className={`p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-500/10 transition-colors cursor-pointer ${
                        activeTimestamp === ts.time ? 'bg-stone-500/15' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 bg-stone-800 text-stone-100 dark:bg-stone-200 dark:text-stone-900">
                          {ts.time}
                        </span>
                        <span className="text-sm font-medium">{ts.label}</span>
                      </div>
                      {ts.description && (
                        <p className="text-xs opacity-75 sm:max-w-md sm:text-right font-serif italic">
                          {ts.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. PHILOSOPHY INQUIRY FRAMEWORK */}
        {post.category === 'philosophy' && (
          <div className="space-y-6 mb-12">
            {/* Central Thesis */}
            {post.centralThesis && (
              <div className={`p-6 border ${getSubtleSurfaceClass()}`}>
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-2">
                  Central Proposition
                </span>
                <p className="text-lg sm:text-xl font-serif italic font-medium leading-relaxed">
                  "{post.centralThesis}"
                </p>
                {post.philosophicalSchool && (
                  <p className="text-xs font-sans opacity-60 mt-2">
                    Tradition: {post.philosophicalSchool}
                  </p>
                )}
              </div>
            )}

            {/* Dialectic Triad */}
            {post.dialectic && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-5 border ${getSubtleSurfaceClass()}`}>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60 block mb-1">
                    01 · Thesis
                  </span>
                  <p className="text-sm font-serif leading-relaxed">
                    {post.dialectic.thesis}
                  </p>
                </div>
                <div className={`p-5 border ${getSubtleSurfaceClass()}`}>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60 block mb-1">
                    02 · Antithesis
                  </span>
                  <p className="text-sm font-serif leading-relaxed">
                    {post.dialectic.antithesis}
                  </p>
                </div>
                <div className={`p-5 border ${getSubtleSurfaceClass()}`}>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60 block mb-1">
                    03 · Synthesis
                  </span>
                  <p className="text-sm font-serif leading-relaxed">
                    {post.dialectic.synthesis}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. DAILY LIFE SETTING & ATMOSPHERE */}
        {post.category === 'daily' && (post.dailyLocation || post.dailyMoodWeather || post.dailyEpiphany) && (
          <div className={`p-6 mb-12 border ${getSubtleSurfaceClass()}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans border-b border-inherit pb-4 mb-4">
              {post.dailyLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-60" />
                  <span><strong>Setting:</strong> {post.dailyLocation}</span>
                </div>
              )}
              {post.dailyMoodWeather && (
                <div className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 opacity-60" />
                  <span><strong>Atmosphere:</strong> {post.dailyMoodWeather}</span>
                </div>
              )}
            </div>

            {post.dailyEpiphany && (
              <div>
                <span className="text-xs uppercase tracking-widest font-mono opacity-60 block mb-1">
                  Daily Epiphany
                </span>
                <p className="font-serif italic text-base sm:text-lg leading-relaxed">
                  "{post.dailyEpiphany}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            ESSAY BODY PROSE (Markdown Rendered with Drop Caps)
           ========================================================================= */}
        <div className={`max-w-2xl mx-auto ${getFontFamilyClass()} ${getFontSizeClass()}`}>
          <MarkdownView content={post.content} enableDropCap={true} />
        </div>

        {/* Secondary Modules for Philosophy (References & Glossary) */}
        {post.category === 'philosophy' && post.primaryReferences && post.primaryReferences.length > 0 && (
          <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-inherit">
            <h4 className="text-xs uppercase tracking-widest font-mono opacity-60 mb-4">
              Primary Literature & Canonical Texts
            </h4>
            <ul className="space-y-2 text-sm font-serif italic opacity-80 list-disc pl-5">
              {post.primaryReferences.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>
        )}

        {post.category === 'philosophy' && post.keyConcepts && post.keyConcepts.length > 0 && (
          <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-inherit">
            <h4 className="text-xs uppercase tracking-widest font-mono opacity-60 mb-4">
              Philosophical Lexicon
            </h4>
            <dl className="space-y-4">
              {post.keyConcepts.map((item, idx) => (
                <div key={idx} className="text-sm">
                  <dt className="font-medium font-sans mb-0.5">{item.term}</dt>
                  <dd className="font-serif opacity-75 leading-relaxed">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* =========================================================================
            READER'S PERSONAL MARGINALIA & REFLECTIONS
           ========================================================================= */}
        <section aria-labelledby="marginalia-heading" className={`max-w-2xl mx-auto mt-16 p-6 sm:p-8 border ${getSubtleSurfaceClass()}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Quote className="w-4 h-4 opacity-60" />
              <h3 id="marginalia-heading" className="text-sm uppercase tracking-widest font-mono font-semibold">
                Your Personal Marginalia
              </h3>
            </div>
            <span className="text-xs opacity-60 font-sans">
              Private notes for this dispatch
            </span>
          </div>

          <form onSubmit={handleAddMarginNote} className="mb-6">
            <textarea
              value={userMarginNote}
              onChange={(e) => setUserMarginNote(e.target.value)}
              placeholder="Record a thought, disagreement, or passage reflection..."
              rows={3}
              className="w-full p-3 text-sm bg-transparent border border-inherit rounded-none focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder:opacity-50 font-serif"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!userMarginNote.trim()}
                className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer"
              >
                Inscribe Note
              </button>
            </div>
          </form>

          {/* List of saved margin notes */}
          {savedMarginNotes.length > 0 ? (
            <div className="space-y-3">
              {savedMarginNotes.map((note, index) => (
                <div
                  key={index}
                  className="p-3 bg-stone-500/10 border-l border-inherit flex items-start justify-between gap-3 text-sm font-serif italic"
                >
                  <p className="leading-relaxed">"{note}"</p>
                  <button
                    onClick={() => handleRemoveMarginNote(index)}
                    className="p-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs opacity-50 font-serif italic text-center py-2">
              No marginalia inscribed yet. Use the field above to save personal reflections on this text.
            </p>
          )}
        </section>

        {/* Footer Navigation within Reader */}
        <footer className="max-w-2xl mx-auto mt-16 pt-8 border-t border-inherit flex items-center justify-between text-xs uppercase tracking-widest font-medium">
          <button
            onClick={closeReader}
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dispatches</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openEditor(post.id)}
              className="hover:opacity-75 transition-opacity cursor-pointer"
            >
              Edit Entry
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this dispatch?')) {
                  deletePost(post.id);
                }
              }}
              className="text-red-600 dark:text-red-400 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Delete
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
};
