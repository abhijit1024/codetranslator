import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LanguageSelector from './LanguageSelector';

const TranslationControls = ({ 
  sourceLanguage, 
  targetLanguage, 
  onSourceLanguageChange, 
  onTargetLanguageChange,
  onTranslate, 
  onSwapLanguages,
  isTranslating,
  canTranslate 
}) => {
  return (
    <div className="bg-card border border-border/50 rounded-2xl shadow-lg p-6 mb-6 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Language Selection Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Source Language */}
          <div className="w-full md:w-56">
            <LanguageSelector
              value={sourceLanguage}
              onChange={onSourceLanguageChange}
              label="From"
              disabled={isTranslating}
            />
          </div>

          {/* Swap Button */}
          <div className="flex-shrink-0 -mx-2 my-2 md:my-0 md:mx-0">
            <Button
              variant="outline"
              size="icon"
              onClick={onSwapLanguages}
              disabled={isTranslating || !sourceLanguage || !targetLanguage}
              className="w-10 h-10 rounded-full hover:bg-muted transition-colors duration-200"
              title="Swap languages"
            >
              <Icon name="ArrowLeftRight" size={18} className="text-muted-foreground" />
            </Button>
          </div>

          {/* Target Language */}
          <div className="w-full md:w-56">
            <LanguageSelector
              value={targetLanguage}
              onChange={onTargetLanguageChange}
              label="To"
              disabled={isTranslating}
            />
          </div>
        </div>

        {/* Translate Button */}
        <div className="w-full flex justify-center pt-2">
          <Button
            variant="default"
            size="lg"
            onClick={onTranslate}
            disabled={!canTranslate}
            loading={isTranslating}
            iconName="Zap"
            iconPosition="left"
            className="min-w-48 h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isTranslating ? 'Translating...' : 'Translate Code'}
          </Button>
        </div>

        {/* Progress Indicator */}
        {isTranslating && (
          <div className="w-full mt-2">
            <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Processing your code with AI...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationControls;