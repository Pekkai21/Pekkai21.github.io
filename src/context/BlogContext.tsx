import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, PostCategory, ShelfItem, ReaderTheme, ReaderFont, ReaderFontSize } from '../types';
import { INITIAL_POSTS, INITIAL_SHELF } from '../data/initialPosts';

interface BlogContextType {
  posts: Post[];
  shelf: ShelfItem[];
  activeCategory: PostCategory | 'all';
  setActiveCategory: (cat: PostCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  activePostId: string | null;
  activePost: Post | null;
  openReader: (postId: string) => void;
  closeReader: () => void;
  isEditorOpen: boolean;
  editingPost: Post | null;
  openEditor: (postId?: string) => void;
  closeEditor: () => void;
  isShelfOpen: boolean;
  setIsShelfOpen: (open: boolean) => void;
  isExportImportOpen: boolean;
  setIsExportImportOpen: (open: boolean) => void;
  bookmarks: string[];
  toggleBookmark: (postId: string) => void;
  savePost: (post: Post) => void;
  deletePost: (postId: string) => void;
  saveShelfItem: (item: ShelfItem) => void;
  deleteShelfItem: (itemId: string) => void;
  resetToDefaults: () => void;
  importData: (newPosts: Post[], newShelf: ShelfItem[]) => void;

  // Reader configuration
  readerTheme: ReaderTheme;
  setReaderTheme: (theme: ReaderTheme) => void;
  readerFont: ReaderFont;
  setReaderFont: (font: ReaderFont) => void;
  readerFontSize: ReaderFontSize;
  setReaderFontSize: (size: ReaderFontSize) => void;
}

const STORAGE_KEY_POSTS = 'marginalia_posts_v1';
const STORAGE_KEY_SHELF = 'marginalia_shelf_v1';
const STORAGE_KEY_BOOKMARKS = 'marginalia_bookmarks_v1';
const STORAGE_KEY_READER_THEME = 'marginalia_reader_theme_v1';
const STORAGE_KEY_READER_FONT = 'marginalia_reader_font_v1';
const STORAGE_KEY_READER_SIZE = 'marginalia_reader_size_v1';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load posts from storage', e);
    }
    return INITIAL_POSTS;
  });

  const [shelf, setShelf] = useState<ShelfItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHELF);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load shelf from storage', e);
    }
    return INITIAL_SHELF;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
    return ['post-1', 'post-2'];
  });

  const [activeCategory, setActiveCategory] = useState<PostCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);

  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(() => {
    return (localStorage.getItem(STORAGE_KEY_READER_THEME) as ReaderTheme) || 'paper';
  });
  const [readerFont, setReaderFont] = useState<ReaderFont>(() => {
    return (localStorage.getItem(STORAGE_KEY_READER_FONT) as ReaderFont) || 'serif';
  });
  const [readerFontSize, setReaderFontSize] = useState<ReaderFontSize>(() => {
    return (localStorage.getItem(STORAGE_KEY_READER_SIZE) as ReaderFontSize) || 'md';
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error('Error saving posts to storage', e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SHELF, JSON.stringify(shelf));
    } catch (e) {
      console.error('Error saving shelf to storage', e);
    }
  }, [shelf]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Error saving bookmarks to storage', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_READER_THEME, readerTheme);
  }, [readerTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_READER_FONT, readerFont);
  }, [readerFont]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_READER_SIZE, readerFontSize);
  }, [readerFontSize]);

  const activePost = activePostId ? posts.find(p => p.id === activePostId) || null : null;
  const editingPost = editingPostId ? posts.find(p => p.id === editingPostId) || null : null;

  const openReader = (postId: string) => {
    setActivePostId(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeReader = () => {
    setActivePostId(null);
  };

  const openEditor = (postId?: string) => {
    setEditingPostId(postId || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingPostId(null);
  };

  const toggleBookmark = (postId: string) => {
    setBookmarks(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const savePost = (post: Post) => {
    setPosts(prev => {
      const index = prev.findIndex(p => p.id === post.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = post;
        return updated;
      }
      return [post, ...prev];
    });
    closeEditor();
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (activePostId === postId) {
      setActivePostId(null);
    }
  };

  const saveShelfItem = (item: ShelfItem) => {
    setShelf(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [item, ...prev];
    });
  };

  const deleteShelfItem = (itemId: string) => {
    setShelf(prev => prev.filter(i => i.id !== itemId));
  };

  const resetToDefaults = () => {
    setPosts(INITIAL_POSTS);
    setShelf(INITIAL_SHELF);
    setBookmarks(['post-1', 'post-2']);
    localStorage.removeItem(STORAGE_KEY_POSTS);
    localStorage.removeItem(STORAGE_KEY_SHELF);
    localStorage.removeItem(STORAGE_KEY_BOOKMARKS);
  };

  const importData = (newPosts: Post[], newShelf: ShelfItem[]) => {
    if (Array.isArray(newPosts) && newPosts.length > 0) {
      setPosts(newPosts);
    }
    if (Array.isArray(newShelf)) {
      setShelf(newShelf);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        shelf,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedTag,
        setSelectedTag,
        activePostId,
        activePost,
        openReader,
        closeReader,
        isEditorOpen,
        editingPost,
        openEditor,
        closeEditor,
        isShelfOpen,
        setIsShelfOpen,
        isExportImportOpen,
        setIsExportImportOpen,
        bookmarks,
        toggleBookmark,
        savePost,
        deletePost,
        saveShelfItem,
        deleteShelfItem,
        resetToDefaults,
        importData,
        readerTheme,
        setReaderTheme,
        readerFont,
        setReaderFont,
        readerFontSize,
        setReaderFontSize
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
