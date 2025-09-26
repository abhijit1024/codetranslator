import React, { useRef, useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const CodeEditor = ({ 
  value, 
  onChange, 
  placeholder, 
  readOnly = false, 
  language,
  onClear,
  onCopy,
  title
}) => {
  const textareaRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard?.writeText(value);
        onCopy?.();
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleScroll = (e) => {
    setScrollTop(e?.target?.scrollTop);
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: '#F7DF1E',
      python: '#3776AB',
      java: '#ED8B00',
      cpp: '#00599C',
      csharp: '#239120',
      go: '#00ADD8',
      rust: '#000000',
      typescript: '#3178C6',
      php: '#777BB4',
      ruby: '#CC342D',
      swift: '#FA7343',
      kotlin: '#7F52FF'
    };
    return colors?.[lang] || '#64748B';
  };

  // Calculate line numbers
  const lines = value ? value?.split('\n') : [''];
  const lineCount = lines?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getLanguageColor(language) }}
          />
          <h3 className="font-medium text-text-primary">{title}</h3>
          {language && (
            <span className="text-sm text-text-secondary bg-muted px-2 py-1 rounded">
              {language?.charAt(0)?.toUpperCase() + language?.slice(1)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!readOnly && onClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              iconName="RotateCcw"
              disabled={!value}
            />
          )}
          {readOnly && value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              iconName="Copy"
            />
          )}
        </div>
      </div>
      {/* Code Area with Line Numbers */}
      <div className="flex-1 flex bg-background/50 overflow-hidden">
        {/* Line Numbers Column */}
        <div 
          className="flex-shrink-0 bg-muted/20 border-r border-border select-none overflow-hidden"
          style={{ 
            width: `${Math.max(String(lineCount)?.length * 0.8 + 1, 3)}rem`,
            transform: `translateY(-${scrollTop}px)` 
          }}
        >
          <div className="p-4 pr-2">
            <div className="font-mono text-sm text-text-secondary/70 leading-relaxed">
              {Array.from({ length: lineCount }, (_, index) => (
                <div key={index + 1} className="text-right h-[1.5em]">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            onScroll={handleScroll}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full h-full p-4 bg-transparent text-text-primary placeholder-text-secondary resize-none border-none outline-none font-mono text-sm leading-relaxed ${
              readOnly ? 'cursor-default' : 'cursor-text'
            }`}
            style={{ 
              minHeight: '300px',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>Lines: {lineCount}</span>
          <span>Characters: {value?.length || 0}</span>
        </div>
        {readOnly && value && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            iconName="Copy"
            iconPosition="left"
          >
            Copy Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;