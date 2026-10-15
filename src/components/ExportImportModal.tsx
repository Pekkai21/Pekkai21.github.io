import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { X, Download, Upload, RotateCcw, FileText, Check, AlertCircle } from 'lucide-react';

export const ExportImportModal: React.FC = () => {
  const {
    isExportImportOpen,
    setIsExportImportOpen,
    posts,
    shelf,
    importData,
    resetToDefaults
  } = useBlog();

  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isExportImportOpen) return null;

  // Export full JSON backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      posts,
      shelf
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marginalia_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && Array.isArray(parsed.posts)) {
          importData(parsed.posts, parsed.shelf || []);
          setImportStatus('Successfully restored archive!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Invalid archive file format.');
        }
      } catch {
        setImportStatus('Failed to read JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Reset all dispatches and shelf items to original curated sample data? Any newly created entries will be replaced.')) {
      resetToDefaults();
      setIsExportImportOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block mb-1">
              Data Management & Portability
            </span>
            <h3 className="text-xl font-serif font-medium text-stone-900 dark:text-stone-100">
              Archive Backup & Restore
            </h3>
          </div>
          <button
            onClick={() => setIsExportImportOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {importStatus && (
          <div className="mb-4 p-3 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300">
          
          {/* Export Section */}
          <div className="p-4 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Download Full Archive (JSON)</span>
            </h4>
            <p className="text-xs text-stone-500 mb-3 font-serif">
              Exports all {posts.length} entries, reviews, timestamps, ratings, and shelf items into a single portable backup file.
            </p>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Export Archive JSON
            </button>
          </div>

          {/* Import Section */}
          <div className="p-4 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Restore Archive (JSON)</span>
            </h4>
            <p className="text-xs text-stone-500 mb-3 font-serif">
              Upload a previously downloaded JSON archive to restore your library.
            </p>
            <label className="inline-block px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-stone-400 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
              Select JSON File
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Section */}
          <div className="p-4 border border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/20">
            <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-600" />
              <span>Reset to Curated Seed Data</span>
            </h4>
            <p className="text-xs text-red-700/80 dark:text-red-400/80 mb-3 font-serif">
              Re-populates the publication with the original default philosophy essays, book reviews, and film analyses.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer"
            >
              Restore Initial Data
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
