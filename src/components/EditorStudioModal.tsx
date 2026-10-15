import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { Post, PostCategory, TimestampNote } from '../types';
import { calculateReadingTime } from '../utils/helpers';
import { MarkdownView } from './MarkdownView';
import {
  X,
  Save,
  BookOpen,
  Film,
  Compass,
  Sun,
  Image,
  Eye,
  PenTool,
  Plus,
  Trash2,
  HelpCircle
} from 'lucide-react';

import heroStudyImg from '../assets/images/editorial_study_hero_1792063595009.jpg';
import bookRovelliImg from '../assets/images/book_rovelli_cover_1792063596027.jpg';
import filmCinemaImg from '../assets/images/film_cinema_still_1792063595527.jpg';
import dailyRainImg from '../assets/images/daily_rain_window_1792063595645.jpg';

const PRESET_IMAGES = [
  {
    name: 'Scholar Study Desk',
    url: heroStudyImg
  },
  {
    name: 'The Order of Time Book Cover',
    url: bookRovelliImg
  },
  {
    name: 'Cinematic Twilight City',
    url: filmCinemaImg
  },
  {
    name: 'Rainy Window & Pour-Over Coffee',
    url: dailyRainImg
  }
];

export const EditorStudioModal: React.FC = () => {
  const { isEditorOpen, closeEditor, editingPost, savePost } = useBlog();

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<PostCategory>('daily');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [coverImage, setCoverImage] = useState('');
  const [coverCaption, setCoverCaption] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);

  // Book review fields
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookYear, setBookYear] = useState<number | ''>('');
  const [bookPages, setBookPages] = useState<number | ''>('');
  const [bookRating, setBookRating] = useState<number>(4.5);
  const [favoriteQuote, setFavoriteQuote] = useState('');
  const [quoteAttribution, setQuoteAttribution] = useState('');
  const [spoilerContent, setSpoilerContent] = useState('');

  // Video review fields
  const [videoDirector, setVideoDirector] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoPlatform, setVideoPlatform] = useState('');
  const [videoRating, setVideoRating] = useState<number>(4.5);
  const [timestamps, setTimestamps] = useState<TimestampNote[]>([]);
  const [newTsTime, setNewTsTime] = useState('');
  const [newTsLabel, setNewTsLabel] = useState('');
  const [newTsDesc, setNewTsDesc] = useState('');

  // Philosophy fields
  const [philosophicalSchool, setPhilosophicalSchool] = useState('');
  const [centralThesis, setCentralThesis] = useState('');
  const [thesisText, setThesisText] = useState('');
  const [antithesisText, setAntithesisText] = useState('');
  const [synthesisText, setSynthesisText] = useState('');
  const [referencesInput, setReferencesInput] = useState('');

  // Daily life fields
  const [dailyLocation, setDailyLocation] = useState('');
  const [dailyMoodWeather, setDailyMoodWeather] = useState('');
  const [dailyEpiphany, setDailyEpiphany] = useState('');

  // Sync with editingPost
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setSubtitle(editingPost.subtitle || '');
      setCategory(editingPost.category);
      setDate(editingPost.date);
      setCoverImage(editingPost.coverImage || '');
      setCoverCaption(editingPost.coverCaption || '');
      setExcerpt(editingPost.excerpt);
      setContent(editingPost.content);
      setTagsInput(editingPost.tags.join(', '));
      setFeatured(!!editingPost.featured);

      // Book
      setBookAuthor(editingPost.bookAuthor || '');
      setBookYear(editingPost.bookYear || '');
      setBookPages(editingPost.bookPages || '');
      setBookRating(editingPost.bookRating || 4.5);
      setFavoriteQuote(editingPost.favoriteQuote || '');
      setQuoteAttribution(editingPost.quoteAttribution || '');
      setSpoilerContent(editingPost.spoilerContent || '');

      // Video
      setVideoDirector(editingPost.videoDirector || '');
      setVideoDuration(editingPost.videoDuration || '');
      setVideoPlatform(editingPost.videoPlatform || '');
      setVideoRating(editingPost.videoRating || 4.5);
      setTimestamps(editingPost.timestamps || []);

      // Philosophy
      setPhilosophicalSchool(editingPost.philosophicalSchool || '');
      setCentralThesis(editingPost.centralThesis || '');
      setThesisText(editingPost.dialectic?.thesis || '');
      setAntithesisText(editingPost.dialectic?.antithesis || '');
      setSynthesisText(editingPost.dialectic?.synthesis || '');
      setReferencesInput(editingPost.primaryReferences?.join('\n') || '');

      // Daily
      setDailyLocation(editingPost.dailyLocation || '');
      setDailyMoodWeather(editingPost.dailyMoodWeather || '');
      setDailyEpiphany(editingPost.dailyEpiphany || '');
    } else {
      // New post defaults
      setTitle('');
      setSubtitle('');
      setCategory('daily');
      setDate(new Date().toISOString().split('T')[0]);
      setCoverImage('');
      setCoverCaption('');
      setExcerpt('');
      setContent('');
      setTagsInput('');
      setFeatured(false);

      setBookAuthor('');
      setBookYear('');
      setBookPages('');
      setBookRating(4.5);
      setFavoriteQuote('');
      setQuoteAttribution('');
      setSpoilerContent('');

      setVideoDirector('');
      setVideoDuration('');
      setVideoPlatform('');
      setVideoRating(4.5);
      setTimestamps([]);

      setPhilosophicalSchool('');
      setCentralThesis('');
      setThesisText('');
      setAntithesisText('');
      setSynthesisText('');
      setReferencesInput('');

      setDailyLocation('');
      setDailyMoodWeather('');
      setDailyEpiphany('');
    }
  }, [editingPost, isEditorOpen]);

  if (!isEditorOpen) return null;

  const handleAddTimestamp = () => {
    if (!newTsTime.trim() || !newTsLabel.trim()) return;
    setTimestamps([
      ...timestamps,
      {
        time: newTsTime.trim(),
        label: newTsLabel.trim(),
        description: newTsDesc.trim() || undefined
      }
    ]);
    setNewTsTime('');
    setNewTsLabel('');
    setNewTsDesc('');
  };

  const handleRemoveTimestamp = (idx: number) => {
    setTimestamps(timestamps.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please provide at least a title and content.');
      return;
    }

    const calculatedExcerpt = excerpt.trim()
      ? excerpt.trim()
      : content
          .replace(/[#*>_`]/g, '')
          .split('\n')[0]
          .slice(0, 180) + '...';

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const postToSave: Post = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      category,
      date,
      readingTimeMinutes: calculateReadingTime(content),
      featured,
      coverImage: coverImage.trim() || undefined,
      coverCaption: coverCaption.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Dispatch'],
      excerpt: calculatedExcerpt,
      content: content.trim(),

      // Book
      ...(category === 'book'
        ? {
            bookAuthor: bookAuthor.trim() || undefined,
            bookYear: Number(bookYear) || undefined,
            bookPages: Number(bookPages) || undefined,
            bookRating: Number(bookRating) || 4.5,
            favoriteQuote: favoriteQuote.trim() || undefined,
            quoteAttribution: quoteAttribution.trim() || undefined,
            spoilers: !!spoilerContent.trim(),
            spoilerContent: spoilerContent.trim() || undefined
          }
        : {}),

      // Video
      ...(category === 'video'
        ? {
            videoDirector: videoDirector.trim() || undefined,
            videoDuration: videoDuration.trim() || undefined,
            videoPlatform: videoPlatform.trim() || undefined,
            videoRating: Number(videoRating) || 4.5,
            timestamps: timestamps.length > 0 ? timestamps : undefined
          }
        : {}),

      // Philosophy
      ...(category === 'philosophy'
        ? {
            philosophicalSchool: philosophicalSchool.trim() || undefined,
            centralThesis: centralThesis.trim() || undefined,
            dialectic:
              thesisText.trim() && antithesisText.trim()
                ? {
                    thesis: thesisText.trim(),
                    antithesis: antithesisText.trim(),
                    synthesis: synthesisText.trim() || 'Dialectical equilibrium achieved through ongoing critical examination.'
                  }
                : undefined,
            primaryReferences: referencesInput
              .split('\n')
              .map(r => r.trim())
              .filter(Boolean)
          }
        : {}),

      // Daily
      ...(category === 'daily'
        ? {
            dailyLocation: dailyLocation.trim() || undefined,
            dailyMoodWeather: dailyMoodWeather.trim() || undefined,
            dailyEpiphany: dailyEpiphany.trim() || undefined
          }
        : {})
    };

    savePost(postToSave);
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const estimatedMin = calculateReadingTime(content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950/40">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
              Publishing Studio
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">|</span>
            <h2 className="text-lg font-serif font-medium text-stone-900 dark:text-stone-100">
              {editingPost ? 'Edit Dispatch' : 'Compose New Entry'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-stone-300 dark:border-stone-700 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-medium cursor-pointer transition-colors ${
                  activeTab === 'write'
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Compose</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-medium cursor-pointer transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <button
              onClick={closeEditor}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
              title="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'write' ? (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Category Segmented Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-2">
                  Select Format & Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('daily')}
                    className={`flex items-center justify-center gap-2 p-2.5 border text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                      category === 'daily'
                        ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Daily Life</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('book')}
                    className={`flex items-center justify-center gap-2 p-2.5 border text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                      category === 'book'
                        ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Book Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('video')}
                    className={`flex items-center justify-center gap-2 p-2.5 border text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                      category === 'video'
                        ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <Film className="w-4 h-4" />
                    <span>Cinema & Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('philosophy')}
                    className={`flex items-center justify-center gap-2 p-2.5 border text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                      category === 'philosophy'
                        ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>Philosophy</span>
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. On the Ethics of Voluntary Discomfort"
                    className="w-full p-3 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-lg font-serif focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-1">
                    Subtitle / Kicker
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Seneca’s radical remedy for the modern hedonic treadmill."
                    className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm font-serif italic focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              </div>

              {/* Date & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-1">
                    Date of Entry
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Stoicism, Ethics, Attention, Books"
                    className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              </div>

              {/* Category-Specific Form Modules */}

              {/* 1. BOOK REVIEW SPECIFICS */}
              {category === 'book' && (
                <div className="p-4 bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
                    Book Review Metadata
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Author</label>
                      <input
                        type="text"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                        placeholder="Carlo Rovelli"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Year</label>
                      <input
                        type="number"
                        value={bookYear}
                        onChange={(e) => setBookYear(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder="2018"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Rating (1.0 - 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={bookRating}
                        onChange={(e) => setBookRating(Number(e.target.value))}
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Favorite Quote / Key Passage</label>
                    <textarea
                      rows={2}
                      value={favoriteQuote}
                      onChange={(e) => setFavoriteQuote(e.target.value)}
                      placeholder="We are time. We are this space..."
                      className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Spoiler Narrative Critique (Optional)</label>
                    <textarea
                      rows={2}
                      value={spoilerContent}
                      onChange={(e) => setSpoilerContent(e.target.value)}
                      placeholder="Deep plot analysis or resolution details..."
                      className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif"
                    />
                  </div>
                </div>
              )}

              {/* 2. CINEMA & VIDEO REVIEW SPECIFICS */}
              {category === 'video' && (
                <div className="p-4 bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
                    Cinema & Video Dossier
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Director / Creator</label>
                      <input
                        type="text"
                        value={videoDirector}
                        onChange={(e) => setVideoDirector(e.target.value)}
                        placeholder="Godfrey Reggio"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Runtime</label>
                      <input
                        type="text"
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(e.target.value)}
                        placeholder="1h 26m"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Rating (1.0 - 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={videoRating}
                        onChange={(e) => setVideoRating(Number(e.target.value))}
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Timestamps list & builder */}
                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Key Sequence Timestamps</label>
                    <div className="space-y-2 mb-3">
                      {timestamps.map((ts, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
                          <span className="font-mono font-semibold">{ts.time}</span>
                          <span className="font-medium truncate flex-1">{ts.label}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTimestamp(idx)}
                            className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="04:15"
                        value={newTsTime}
                        onChange={(e) => setNewTsTime(e.target.value)}
                        className="p-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono sm:w-20"
                      />
                      <input
                        type="text"
                        placeholder="Chapter label (e.g. The Grid Sequence)"
                        value={newTsLabel}
                        onChange={(e) => setNewTsLabel(e.target.value)}
                        className="p-1.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs flex-1"
                      />
                      <button
                        type="button"
                        onClick={handleAddTimestamp}
                        className="px-3 py-1.5 text-xs bg-stone-800 text-stone-100 hover:bg-stone-700 transition-colors cursor-pointer"
                      >
                        Add Timestamp
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PHILOSOPHY SPECIFICS */}
              {category === 'philosophy' && (
                <div className="p-4 bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
                    Philosophical Architecture
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">School / Tradition</label>
                      <input
                        type="text"
                        value={philosophicalSchool}
                        onChange={(e) => setPhilosophicalSchool(e.target.value)}
                        placeholder="Roman Stoicism / Existentialism"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Central Proposition / Thesis</label>
                      <input
                        type="text"
                        value={centralThesis}
                        onChange={(e) => setCentralThesis(e.target.value)}
                        placeholder="Voluntary discomfort decouples contentment from external luxury..."
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif italic"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Thesis (Initial Claim)</label>
                      <textarea
                        rows={2}
                        value={thesisText}
                        onChange={(e) => setThesisText(e.target.value)}
                        placeholder="Comfort is the objective of civilization..."
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Antithesis (Counter-argument)</label>
                      <textarea
                        rows={2}
                        value={antithesisText}
                        onChange={(e) => setAntithesisText(e.target.value)}
                        placeholder="Frictionlessness weakens human antifragility..."
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Synthesis (Resolution)</label>
                      <textarea
                        rows={2}
                        value={synthesisText}
                        onChange={(e) => setSynthesisText(e.target.value)}
                        placeholder="Deliberate periodic friction inoculates the psyche..."
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Primary Literature References (One per line)</label>
                    <textarea
                      rows={2}
                      value={referencesInput}
                      onChange={(e) => setReferencesInput(e.target.value)}
                      placeholder="Seneca. Moral Letters to Lucilius (Letter XVIII)&#10;Marcus Aurelius. Meditations"
                      className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif"
                    />
                  </div>
                </div>
              )}

              {/* 4. DAILY LIFE SPECIFICS */}
              {category === 'daily' && (
                <div className="p-4 bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
                    Daily Life Context
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Location / Setting</label>
                      <input
                        type="text"
                        value={dailyLocation}
                        onChange={(e) => setDailyLocation(e.target.value)}
                        placeholder="Kyoto, Northern Ward (Courtyard Bench)"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 mb-1">Weather & Sensory Atmosphere</label>
                      <input
                        type="text"
                        value={dailyMoodWeather}
                        onChange={(e) => setDailyMoodWeather(e.target.value)}
                        placeholder="Early rain, 13°C, petrichor and roasted coffee"
                        className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Daily Epiphany / Quiet Realization</label>
                    <input
                      type="text"
                      value={dailyEpiphany}
                      onChange={(e) => setDailyEpiphany(e.target.value)}
                      placeholder="Boredom is not an emptiness to be filled, but the fertile clearing for original thought."
                      className="w-full p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-serif italic"
                    />
                  </div>
                </div>
              )}

              {/* Cover Image Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-2">
                  Cover Image & Artwork
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`relative aspect-[16/10] overflow-hidden border cursor-pointer text-left ${
                        coverImage === preset.url
                          ? 'ring-2 ring-stone-900 dark:ring-stone-100 border-transparent'
                          : 'border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-stone-900/40 p-1.5 flex items-end">
                        <span className="text-[10px] text-stone-100 font-sans truncate">{preset.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Or enter custom image path or URL..."
                    className="flex-1 p-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono"
                  />
                  {coverImage && (
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="px-3 py-1 text-xs border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-stone-500 mb-1">
                  Summary / Excerpt (Shows on cards)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise synopsis of the dispatch..."
                  className="w-full p-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              {/* Main Content (Markdown) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs uppercase tracking-wider font-mono text-stone-500">
                    Prose Body (Markdown Supported: ## headings, &gt; blockquotes, - lists) *
                  </label>
                  <span className="text-xs font-mono text-stone-400">
                    {wordCount} words · {estimatedMin} min read
                  </span>
                </div>
                <textarea
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Inscribe your thoughts here..."
                  className="w-full p-4 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-base font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPost ? 'Save Changes' : 'Publish Dispatch'}</span>
                </button>
              </div>

            </form>
          ) : (
            /* Live Preview Tab */
            <div className="max-w-2xl mx-auto py-8">
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-mono block mb-2">
                  Preview · {category.toUpperCase()}
                </span>
                <h1 className="text-3xl font-serif font-medium mb-3">
                  {title || 'Untitled Dispatch'}
                </h1>
                {subtitle && (
                  <p className="font-serif italic text-stone-600 dark:text-stone-400 mb-4">
                    {subtitle}
                  </p>
                )}
              </div>

              {coverImage && (
                <div className="mb-8 border border-stone-300 dark:border-stone-700 overflow-hidden">
                  <img src={coverImage} alt={title} className="w-full h-64 object-cover" />
                </div>
              )}

              <MarkdownView content={content || '*No content inscribed yet.*'} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
