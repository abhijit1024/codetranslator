/**
 * Handles common Gemini API errors with user-friendly messages.
 * @param {Error} error - The error object from the API.
 * @returns {Object} Error object with type and user-friendly message.
 */
export function handleGeminiError(error) {
    console.error('Gemini API Error:', error);
  
    if (error?.message?.includes('429')) {
      return {
        type: 'rate_limit',
        message: 'Rate limit exceeded. Please wait a moment before trying again.'
      };
    }
    
    if (error?.message?.includes('SAFETY')) {
      return {
        type: 'safety',
        message: 'Content was blocked by safety filters. Please modify your request and try again.'
      };
    }
    
    if (error?.message?.includes('cancelled') || error?.message?.includes('aborted')) {
      return {
        type: 'cancelled',
        message: 'Request was cancelled by user.'
      };
    }
    
    if (error?.message?.includes('timeout')) {
      return {
        type: 'timeout',
        message: 'Request timed out. Please try again.'
      };
    }
    
    if (error?.message?.includes('API key') || error?.message?.includes('authentication')) {
      return {
        type: 'api_key',
        message: 'API key is invalid or missing. Please check your configuration.'
      };
    }
  
    if (error?.message?.includes('quota') || error?.message?.includes('billing')) {
      return {
        type: 'quota',
        message: 'API quota exceeded or billing issue. Please check your Google AI Studio account.'
      };
    }
    
    return {
      type: 'network',
      message: 'An unexpected error occurred. Please check your internet connection and try again.'
    };
  }
  
  /**
   * Comprehensive safety settings for content filtering.
   * @returns {Array} Safety settings configuration.
   */
  export function getSafetySettings() {
    return [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_LOW_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_LOW_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_LOW_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_LOW_AND_ABOVE"
      }
    ];
  }