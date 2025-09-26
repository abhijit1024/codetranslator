import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import TranslationControls from './components/TranslationControls';
import CodeEditor from './components/CodeEditor';
import AccuracyMetrics from './components/AccuracyMetrics';
import ErrorDisplay from './components/ErrorDisplay';
import { streamCodeTranslation } from '../../services/geminiCodeTranslation';

const CodeTranslation = () => {
  // State management
  const [sourceLanguage, setSourceLanguage] = useState('javascript');
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [accuracyMetrics, setAccuracyMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [abortController, setAbortController] = useState(null);

  // Handle source code change
  const handleSourceCodeChange = useCallback((e) => {
    setSourceCode(e?.target?.value);
    setError(null);
  }, []);

  // Clear source code
  const handleClearSource = useCallback(() => {
    setSourceCode('');
    setTranslatedCode('');
    setAccuracyMetrics(null);
    setError(null);
    setTranslationProgress(0);
  }, []);

  // Copy translated code
  const handleCopyTranslated = useCallback(() => {
    if (translatedCode) {
      navigator.clipboard?.writeText(translatedCode)?.then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })?.catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = translatedCode;
        document.body?.appendChild(textArea);
        textArea?.select();
        document.execCommand('copy');
        document.body?.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  }, [translatedCode]);

  // Swap languages
  const handleSwapLanguages = useCallback(() => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    // Also swap the code if both exist
    if (sourceCode && translatedCode) {
      const tempCode = sourceCode;
      setSourceCode(translatedCode);
      setTranslatedCode(tempCode);
    }
  }, [sourceLanguage, targetLanguage, sourceCode, translatedCode]);

  // Cancel translation
  const handleCancelTranslation = useCallback(() => {
    if (abortController) {
      abortController?.abort();
      setAbortController(null);
      setIsTranslating(false);
      setTranslationProgress(0);
    }
  }, [abortController]);

  // Simplified Gemini API translation function
  const translateCodeWithGemini = useCallback(async () => {
    // Use environment variable for API key
    const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      setError({
        type: 'api_key',
        message: 'Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.'
      });
      return;
    }

    if (!sourceCode?.trim()) {
      setError({
        type: 'validation',
        message: 'Please enter some code to translate.'
      });
      return;
    }

    // Create abort controller for cancellation
    const controller = new AbortController();
    setAbortController(controller);
    setIsTranslating(true);
    setError(null);
    setAccuracyMetrics(null);
    setTranslatedCode('');
    setTranslationProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setTranslationProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 15;
        }
        return prev;
      });
    }, 500);

    try {
      // Use streaming for better user experience
      let streamedText = '';
      const result = await streamCodeTranslation(
        sourceCode,
        sourceLanguage,
        targetLanguage,
        (chunk) => {
          streamedText += chunk;
          setTranslatedCode(streamedText);
          setTranslationProgress(prev => Math.min(prev + 2, 95));
        },
        controller?.signal
      );

      // Final cleanup
      clearInterval(progressInterval);
      setTranslationProgress(100);
      setTranslatedCode(result?.translatedCode);
      setAccuracyMetrics(result?.metrics);

    } catch (err) {
      clearInterval(progressInterval);
      
      if (err?.message?.includes('cancelled')) {
        setError({
          type: 'cancelled',
          message: 'Translation was cancelled by user.'
        });
      } else {
        setError({
          type: 'network',
          message: err?.message || 'Failed to translate code. Please check your internet connection.'
        });
      }
      
      setTranslationProgress(0);
    } finally {
      setIsTranslating(false);
      setAbortController(null);
      clearInterval(progressInterval);
    }
  }, [sourceCode, sourceLanguage, targetLanguage]);

  // Check if translation is possible
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;
  const canTranslate = apiKey && apiKey !== 'your-gemini-api-key-here' && sourceCode?.trim() && sourceLanguage && targetLanguage && !isTranslating;

  // Handle error retry
  const handleRetry = useCallback(() => {
    setError(null);
    if (error?.type !== 'api_key') {
      translateCodeWithGemini();
    }
  }, [error, translateCodeWithGemini]);

  // Handle error dismiss
  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              AI Code Translation
            </h1>
            <p className="text-text-secondary">
              Convert your code between programming languages using AI
            </p>
          </div>

          {/* Error Display */}
          <ErrorDisplay
            error={error}
            onRetry={handleRetry}
            onDismiss={handleDismissError}
          />

          {/* Translation Progress */}
          {isTranslating && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                {/* Circular Loading Spinner */}
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-background border-t-primary rounded-full animate-spin"></div>
                </div>
                
                <span className="text-sm font-medium text-text-primary">
                  Translating code...
                </span>
                
                <button
                  onClick={handleCancelTranslation}
                  className="text-sm text-destructive hover:text-destructive-hover transition-colors"
                >
                  Cancel Translation
                </button>
              </div>
            </div>
          )}

          {/* Translation Controls */}
          <TranslationControls
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSourceLanguageChange={setSourceLanguage}
            onTargetLanguageChange={setTargetLanguage}
            onTranslate={translateCodeWithGemini}
            onSwapLanguages={handleSwapLanguages}
            isTranslating={isTranslating}
            canTranslate={canTranslate}
          />

          {/* Code Editors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Source Code Editor */}
            <CodeEditor
              value={sourceCode}
              onChange={handleSourceCodeChange}
              placeholder={`Enter your ${sourceLanguage} code here...`}
              language={sourceLanguage}
              onClear={handleClearSource}
              title="Source Code"
            />

            {/* Translated Code Editor */}
            <CodeEditor
              value={translatedCode}
              readOnly
              placeholder="Translated code will appear here..."
              language={targetLanguage}
              onCopy={handleCopyTranslated}
              title="Translated Code"
            />
          </div>

          {/* Copy Success Message */}
          {copySuccess && (
            <div className="fixed bottom-4 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-elevated z-50">
              Code copied to clipboard!
            </div>
          )}

          {/* Accuracy Metrics */}
          <AccuracyMetrics
            metrics={accuracyMetrics}
            isVisible={!!translatedCode && !isTranslating}
          />
        </div>
      </main>
    </div>
  );
};

export default CodeTranslation;