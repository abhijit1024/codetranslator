import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ApiKeySection = ({ apiKey, onApiKeyChange, isValidApiKey }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    // Auto-expand if no API key is stored
    if (!apiKey) {
      setIsExpanded(true);
    }
  }, [apiKey]);

  const handleApiKeyChange = (e) => {
    onApiKeyChange(e?.target?.value);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft mb-6">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-smooth"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Icon name="Key" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">Gemini API Configuration</h3>
            <p className="text-sm text-text-secondary">
              {apiKey ? 'API key configured' : 'API key required for translation'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isValidApiKey && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Valid</span>
            </div>
          )}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            color="var(--color-text-secondary)" 
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Input
                label="Gemini API Key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={handleApiKeyChange}
                description="Your API key is stored securely in your browser and never sent to our servers"
                error={apiKey && !isValidApiKey ? "Invalid API key format" : ""}
                className="pr-12"
              />
              <button
                type="button"
                onClick={toggleShowApiKey}
                className="absolute right-3 top-8 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name={showApiKey ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">How to get your API key:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Visit Google AI Studio (makersuite.google.com)</li>
                  <li>Sign in with your Google account</li>
                  <li>Navigate to "Get API Key" section</li>
                  <li>Create a new API key for Gemini</li>
                  <li>Copy and paste it here</li>
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>SSL encrypted and stored locally</span>
              </div>
              {apiKey && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onApiKeyChange('')}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Clear Key
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeySection;