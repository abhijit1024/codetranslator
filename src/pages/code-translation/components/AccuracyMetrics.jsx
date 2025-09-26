import React from 'react';
import Icon from '../../../components/AppIcon';

const AccuracyMetrics = ({ metrics, isVisible }) => {
  if (!isVisible || !metrics) return null;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return 'CheckCircle';
    if (score >= 70) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6 mt-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
          <Icon name="BarChart3" size={16} color="var(--color-accent)" />
        </div>
        <h3 className="font-semibold text-text-primary">Translation Accuracy Metrics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Confidence */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Overall Confidence</span>
            <Icon 
              name={getScoreIcon(metrics?.overallConfidence)} 
              size={16} 
              className={getScoreColor(metrics?.overallConfidence)}
            />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metrics?.overallConfidence}%
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics?.overallConfidence >= 90 ? 'bg-success' :
                metrics?.overallConfidence >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metrics?.overallConfidence}%` }}
            />
          </div>
        </div>

        {/* Syntax Accuracy */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Syntax Accuracy</span>
            <Icon 
              name={getScoreIcon(metrics?.syntaxAccuracy)} 
              size={16} 
              className={getScoreColor(metrics?.syntaxAccuracy)}
            />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metrics?.syntaxAccuracy}%
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics?.syntaxAccuracy >= 90 ? 'bg-success' :
                metrics?.syntaxAccuracy >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metrics?.syntaxAccuracy}%` }}
            />
          </div>
        </div>

        {/* Logic Preservation */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Logic Preservation</span>
            <Icon 
              name={getScoreIcon(metrics?.logicPreservation)} 
              size={16} 
              className={getScoreColor(metrics?.logicPreservation)}
            />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metrics?.logicPreservation}%
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics?.logicPreservation >= 90 ? 'bg-success' :
                metrics?.logicPreservation >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metrics?.logicPreservation}%` }}
            />
          </div>
        </div>

        {/* Code Quality */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Code Quality</span>
            <Icon 
              name={getScoreIcon(metrics?.codeQuality)} 
              size={16} 
              className={getScoreColor(metrics?.codeQuality)}
            />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metrics?.codeQuality}%
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics?.codeQuality >= 90 ? 'bg-success' :
                metrics?.codeQuality >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${metrics?.codeQuality}%` }}
            />
          </div>
        </div>
      </div>
      {/* Additional Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Translation Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} color="var(--color-text-secondary)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Processing Time</p>
              <p className="text-sm text-text-secondary">{metrics?.processingTime}ms</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="FileText" size={16} color="var(--color-text-secondary)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">Lines Translated</p>
              <p className="text-sm text-text-secondary">{metrics?.linesTranslated} lines</p>
            </div>
          </div>
        </div>
        
        {metrics?.suggestions && metrics?.suggestions?.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-text-primary mb-2">Suggestions for Improvement</h5>
            <ul className="space-y-1">
              {metrics?.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="ArrowRight" size={12} className="mt-1 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccuracyMetrics;