import React from 'react';

interface MarkdownViewProps {
  content: string;
  enableDropCap?: boolean;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  content,
  enableDropCap = true,
  className = ''
}) => {
  // Split into blocks by double newlines
  const blocks = content.split(/\n\s*\n/);

  const renderInline = (text: string): React.ReactNode => {
    // Basic inline formatting: **bold**, *italic*, `code`, [link](url)
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    // Pattern for inline elements
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/;

    while (remaining.length > 0) {
      const match = remaining.match(regex);
      if (!match || match.index === undefined) {
        parts.push(remaining);
        break;
      }

      if (match.index > 0) {
        parts.push(remaining.substring(0, match.index));
      }

      const fullMatch = match[0];
      if (fullMatch.startsWith('**')) {
        parts.push(<strong key={key++} className="font-semibold text-stone-900 dark:text-stone-100">{match[2]}</strong>);
      } else if (fullMatch.startsWith('*')) {
        parts.push(<em key={key++} className="italic text-stone-800 dark:text-stone-200">{match[3]}</em>);
      } else if (fullMatch.startsWith('`')) {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded">
            {match[4]}
          </code>
        );
      } else if (fullMatch.startsWith('[')) {
        parts.push(
          <a
            key={key++}
            href={match[6]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-900 dark:text-stone-100 underline underline-offset-4 decoration-stone-400 hover:decoration-stone-800 dark:hover:decoration-stone-200 transition-colors"
          >
            {match[5]}
          </a>
        );
      }

      remaining = remaining.substring(match.index + fullMatch.length);
    }

    return parts;
  };

  return (
    <div className={`prose-container space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed ${className}`}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-xl md:text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 mt-8 mb-3 tracking-tight"
            >
              {renderInline(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-2xl md:text-3xl font-serif font-medium text-stone-900 dark:text-stone-100 mt-10 mb-4 tracking-tight border-b border-stone-200 dark:border-stone-800 pb-2"
            >
              {renderInline(trimmed.replace(/^##\s+/, ''))}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={index}
              className="text-3xl md:text-4xl font-serif font-medium text-stone-900 dark:text-stone-100 mt-12 mb-4 tracking-tight"
            >
              {renderInline(trimmed.replace(/^#\s+/, ''))}
            </h1>
          );
        }

        // Blockquote (no thick left border as per constitution - clean top/bottom hairline or gentle indentation)
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed
            .split('\n')
            .map(line => line.replace(/^>\s*/, ''))
            .join(' ');
          return (
            <blockquote
              key={index}
              className="my-8 py-4 px-6 bg-stone-100/60 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-serif italic text-lg md:text-xl leading-relaxed"
            >
              {renderInline(quoteLines)}
            </blockquote>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(Boolean);
          return (
            <ol key={index} className="list-decimal pl-6 space-y-2 my-4 text-stone-700 dark:text-stone-300">
              {items.map((item, idx) => (
                <li key={idx}>
                  {renderInline(item.replace(/^\d+\.\s*/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        // Unordered list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter(Boolean);
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 my-4 text-stone-700 dark:text-stone-300">
              {items.map((item, idx) => (
                <li key={idx}>
                  {renderInline(item.replace(/^[-*]\s*/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Regular Paragraph
        const isFirst = index === 0 && enableDropCap;
        return (
          <p
            key={index}
            className={`text-base md:text-lg leading-relaxed ${isFirst ? 'drop-cap' : ''}`}
          >
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
