import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorDisplay = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  const getErrorIcon = (type) => {
    switch (type) {
      case 'api_key':
        return 'Key';
      case 'network':
        return 'Wifi';
      case 'validation':
        return 'AlertTriangle';
      case 'rate_limit':
        return 'Clock';
      default:
        return 'AlertCircle';
    }
  };

  const getErrorTitle = (type) => {
    switch (type) {
      case 'api_key':
        return 'API Key Required';
      case 'network':
        return 'Network Error';
      case 'validation':
        return 'Invalid Code';
      case 'rate_limit':
        return 'Rate Limit Exceeded';
      default:
        return 'Translation Error';
    }
  };

  return (
    <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-error/10 rounded-lg flex-shrink-0">
          <Icon name={getErrorIcon(error?.type)} size={16} color="var(--color-error)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-error mb-1">
            {getErrorTitle(error?.type)}
          </h3>
          <p className="text-sm text-text-secondary mb-3">
            {error?.message}
          </p>
          
          {error?.type === 'api_key' && (
            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-text-secondary">
                Please configure your Gemini API key in the API Configuration section above to start translating code.
              </p>
            </div>
          )}

          {error?.type === 'rate_limit' && (
            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-text-secondary">
                You've exceeded the API rate limit. Please wait a moment before trying again.
              </p>
            </div>
          )}

          <div className="flex items-center space-x-3">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Try Again
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                iconName="X"
                iconPosition="left"
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;