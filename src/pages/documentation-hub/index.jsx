import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import useTheme from '../../hooks/useTheme';
import { BookOpen, ArrowLeft, Search, Bookmark, ExternalLink } from 'lucide-react';

const DocumentationHub = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // Documentation sections data
  const documentationSections = [
    {
      id: 'overview',
      title: 'Project Overview',
      icon: BookOpen,
      subsections: [
        { id: 'purpose', title: 'Application Purpose', href: '#purpose' },
        { id: 'audience', title: 'Target Audience', href: '#audience' },
        { id: 'benefits', title: 'Key Benefits', href: '#benefits' }
      ]
    },
    {
      id: 'technologies',
      title: 'Technologies Used',
      icon: ExternalLink,
      subsections: [
        { id: 'frontend', title: 'Frontend Stack', href: '#frontend' },
        { id: 'ai-models', title: 'AI Integration', href: '#ai-models' },
        { id: 'architecture', title: 'Technical Architecture', href: '#architecture' }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      icon: Search,
      subsections: [
        { id: 'translation-process', title: 'Translation Process', href: '#translation-process' },
        { id: 'accuracy-measurement', title: 'Accuracy Measurement', href: '#accuracy-measurement' },
        { id: 'supported-languages', title: 'Supported Languages', href: '#supported-languages' }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      icon: Bookmark,
      subsections: [
        { id: 'core-features', title: 'Core Capabilities', href: '#core-features' },
        { id: 'user-interface', title: 'User Interface', href: '#user-interface' },
        { id: 'quality-metrics', title: 'Quality Metrics', href: '#quality-metrics' }
      ]
    },
    {
      id: 'usage',
      title: 'Usage Instructions',
      icon: BookOpen,
      subsections: [
        { id: 'getting-started', title: 'Getting Started', href: '#getting-started' },
        { id: 'best-practices', title: 'Best Practices', href: '#best-practices' },
        { id: 'troubleshooting', title: 'Troubleshooting', href: '#troubleshooting' }
      ]
    }
  ];

  const [activeSection, setActiveSection] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [bookmarkedSections, setBookmarkedSections] = React.useState([]);

  // Handle bookmark toggle
  const toggleBookmark = (sectionId) => {
    setBookmarkedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Filter sections based on search
  const filteredSections = documentationSections?.filter(section =>
    section?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    section?.subsections?.some(sub => 
      sub?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Documentation Hub - CodeTranslator</title>
        <meta name="description" content="Comprehensive documentation for the CodeTranslator application - your AI-powered code translation tool" />
      </Helmet>
      <Header />
      <div className="pt-16 flex min-h-screen">
        {/* Fixed Navigation Sidebar */}
        <nav className="fixed left-0 top-16 bottom-0 w-80 bg-card border-r border-border overflow-y-auto">
          <div className="p-6">
            {/* Navigation Header */}
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => window.history?.back()}
                className="p-2 rounded-lg bg-background hover:bg-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-text-secondary" />
              </button>
              <h2 className="text-lg font-semibold text-text-primary">Documentation</h2>
            </div>

            {/* Search Functionality */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2">
              {filteredSections?.map((section) => {
                const IconComponent = section?.icon;
                const isActive = activeSection === section?.id;
                const isBookmarked = bookmarkedSections?.includes(section?.id);

                return (
                  <div key={section?.id} className="space-y-1">
                    <button
                      onClick={() => setActiveSection(section?.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent text-text-primary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{section?.title}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          toggleBookmark(section?.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          isBookmarked ? 'text-yellow-500' : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </button>

                    {/* Subsections */}
                    {isActive && section?.subsections && (
                      <div className="ml-7 space-y-1">
                        {section?.subsections?.map((subsection) => (
                          <a
                            key={subsection?.id}
                            href={subsection?.href}
                            className="block p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-accent rounded transition-all"
                          >
                            {subsection?.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="ml-80 flex-1 p-8 max-w-none">
          <div className="max-w-4xl">
            {/* Content Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                CodeTranslator Documentation
              </h1>
              <p className="text-lg text-text-secondary">
                Complete guide to using our AI-powered code translation platform
              </p>
            </div>

            {/* Dynamic Content Based on Active Section */}
            {activeSection === 'overview' && (
              <section className="space-y-8">
                <div id="purpose" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Application Purpose
                  </h2>
                  <div className="prose prose-lg max-w-none text-text-secondary">
                    <p>
                      CodeTranslator is an advanced AI-powered application designed to seamlessly convert code 
                      between different programming languages. Built with cutting-edge Google Gemini AI technology, 
                      it provides developers with accurate, context-aware code translations that preserve logic, 
                      structure, and best practices.
                    </p>
                    <p>
                      The application addresses the common challenge developers face when working with multiple 
                      programming languages, whether migrating legacy systems, learning new languages, or 
                      collaborating across diverse technology stacks.
                    </p>
                  </div>
                </div>

                <div id="audience" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Target Audience
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-3">Software Developers</h3>
                      <p className="text-text-secondary">
                        Professional developers working across multiple programming languages who need 
                        quick and accurate code translations for projects, migrations, or learning.
                      </p>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-3">Students & Educators</h3>
                      <p className="text-text-secondary">
                        Computer science students and educators learning or teaching different programming 
                        paradigms and wanting to see equivalent implementations across languages.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="benefits" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Key Benefits
                  </h2>
                  <div className="grid gap-4">
                    {[
                      'High-accuracy AI-powered translations preserving code logic and structure',
                      'Support for 13+ popular programming languages including JavaScript, Python, Java, C++',
                      'Real-time streaming translation with progress feedback',
                      'Comprehensive accuracy metrics and quality assessment',
                      'Clean, modern interface with dark/light theme support',
                      'Instant code copying and easy-to-use editor interfaces'
                    ]?.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-text-secondary">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'technologies' && (
              <section className="space-y-8">
                <div id="frontend" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Frontend Technology Stack
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'React 18.2.0', description: 'Modern functional components with Hooks for state management and lifecycle methods' },
                      { name: 'Vite', description: 'Lightning-fast build tool and development server for optimal performance' },
                      { name: 'Tailwind CSS 3.4.6', description: 'Utility-first CSS framework for responsive and customizable design' },
                      { name: 'React Router 6.0.2', description: 'Declarative routing solution for single-page application navigation' },
                      { name: 'Lucide React', description: 'Beautiful, customizable icon library with 480+ SVG icons' },
                      { name: 'Framer Motion', description: 'Production-ready animation library for smooth UI transitions' }
                    ]?.map((tech, index) => (
                      <div key={index} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{tech?.name}</h3>
                        <p className="text-text-secondary text-sm">{tech?.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="ai-models" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    AI Integration & Models
                  </h2>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Google Gemini 2.5 Flash</h3>
                    <div className="space-y-4">
                      <p className="text-text-secondary">
                        Our primary AI engine leverages Google's advanced Gemini 2.5 Flash model, specifically 
                        optimized for code translation tasks with enhanced accuracy and performance.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Model Configuration</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Temperature: 0.1 (deterministic output)</li>
                            <li>• TopP: 0.8 (focused token selection)</li>
                            <li>• TopK: 32 (vocabulary restriction)</li>
                            <li>• Max Tokens: 8,192 (extended responses)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Safety Features</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Content filtering & safety settings</li>
                            <li>• Request cancellation support</li>
                            <li>• Error handling & retry logic</li>
                            <li>• Rate limiting & quota management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="architecture" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Technical Architecture
                  </h2>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">Component Architecture</h3>
                        <div className="bg-background p-4 rounded border border-border font-mono text-sm">
                          <pre className="text-text-secondary overflow-x-auto">
{`src/
├── components/           # Reusable UI components
│   └── ui/              # Base UI components (Button, Input, etc.)
├── pages/               # Feature-based page components
│   └── code-translation/# Code translation feature
├── services/            # API integration & business logic
├── hooks/               # Custom React hooks
├── utils/               # Utility functions & helpers
└── styles/              # Global styles & theme`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">Data Flow</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { step: '1. Input', desc: 'User enters source code and selects languages' },
                            { step: '2. Processing', desc: 'AI service processes with streaming response' },
                            { step: '3. Output', desc: 'Translated code with quality metrics displayed' }
                          ]?.map((flow, index) => (
                            <div key={index} className="text-center p-4 bg-background rounded border border-border">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                                {flow?.step?.split('.')?.[0]}
                              </div>
                              <h4 className="font-medium text-text-primary mb-1">{flow?.step}</h4>
                              <p className="text-sm text-text-secondary">{flow?.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'how-it-works' && (
              <section className="space-y-8">
                <div id="translation-process" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Translation Process
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Step-by-Step Process</h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            step: 1,
                            title: 'Code Input & Validation',
                            description: 'User inputs source code, selects source and target programming languages. System validates input and checks for API key configuration.'
                          },
                          {
                            step: 2,
                            title: 'AI Prompt Generation',
                            description: 'Advanced prompt engineering creates context-aware instructions for Gemini AI, including language-specific requirements and best practices.'
                          },
                          {
                            step: 3,
                            title: 'Streaming Translation',
                            description: 'Real-time streaming API call to Gemini 2.5 Flash provides progressive translation updates with live progress feedback.'
                          },
                          {
                            step: 4,
                            title: 'Code Extraction & Cleanup',
                            description: 'Intelligent parsing removes markdown formatting, extracts clean code, and applies language-specific formatting rules.'
                          },
                          {
                            step: 5,
                            title: 'Quality Assessment',
                            description: 'Comprehensive analysis generates accuracy metrics, syntax validation, logic preservation scores, and improvement suggestions.'
                          }
                        ]?.map((process) => (
                          <div key={process?.step} className="flex gap-4 p-4 bg-background rounded border border-border">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                              {process?.step}
                            </div>
                            <div>
                              <h4 className="font-medium text-text-primary mb-2">{process?.title}</h4>
                              <p className="text-text-secondary text-sm">{process?.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Translation Algorithm</h3>
                      <div className="bg-background p-4 rounded border border-border">
                        <pre className="text-sm text-text-secondary overflow-x-auto">
{`// Simplified translation flow
async function translateCode(sourceCode, sourceLang, targetLang) {
  // 1. Input validation
  validateInput(sourceCode, sourceLang, targetLang);
  
  // 2. Generate enhanced prompt
  const prompt = generatePrompt(sourceCode, sourceLang, targetLang);
  
  // 3. Stream AI translation
  const result = await streamGeminiTranslation(prompt);
  
  // 4. Extract and clean code
  const cleanCode = extractCodeFromResponse(result);
  
  // 5. Generate quality metrics
  const metrics = generateAccuracyMetrics(sourceCode, cleanCode);
  
  return { translatedCode: cleanCode, metrics };
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="accuracy-measurement" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Accuracy Measurement Methodology
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Quality Metrics</h3>
                      <div className="space-y-3">
                        {[
                          { metric: 'Syntax Accuracy', range: '70-100%', description: 'Validates proper language syntax and structure' },
                          { metric: 'Logic Preservation', range: '75-100%', description: 'Ensures original functionality is maintained' },
                          { metric: 'Code Quality', range: '70-100%', description: 'Assesses comments, readability, and conventions' },
                          { metric: 'Overall Confidence', range: '70-100%', description: 'Weighted average of all quality factors' }
                        ]?.map((metric, index) => (
                          <div key={index} className="pb-3 border-b border-border last:border-b-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-text-primary">{metric?.metric}</span>
                              <span className="text-sm text-text-secondary">{metric?.range}</span>
                            </div>
                            <p className="text-sm text-text-secondary">{metric?.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Assessment Criteria</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Syntax Validation</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Proper function/method declarations</li>
                            <li>• Correct variable and constant usage</li>
                            <li>• Language-specific syntax compliance</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Logic Analysis</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Code structure similarity analysis</li>
                            <li>• Line count proportionality check</li>
                            <li>• Control flow preservation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Quality Assessment</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Comment and documentation presence</li>
                            <li>• Best practice adherence</li>
                            <li>• Code readability and maintainability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="supported-languages" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Supported Programming Languages
                  </h2>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { lang: 'JavaScript', ext: '.js', desc: 'Modern ES6+ and Node.js support' },
                      { lang: 'Python', ext: '.py', desc: 'Python 3.x with advanced features' },
                      { lang: 'Java', ext: '.java', desc: 'Object-oriented programming' },
                      { lang: 'C++', ext: '.cpp', desc: 'System-level programming' },
                      { lang: 'C#', ext: '.cs', desc: '.NET framework compatible' },
                      { lang: 'TypeScript', ext: '.ts', desc: 'Type-safe JavaScript superset' },
                      { lang: 'Go', ext: '.go', desc: 'Concurrent programming support' },
                      { lang: 'Rust', ext: '.rs', desc: 'Memory-safe systems programming' },
                      { lang: 'PHP', ext: '.php', desc: 'Web development focused' },
                      { lang: 'Ruby', ext: '.rb', desc: 'Dynamic, expressive syntax' },
                      { lang: 'Kotlin', ext: '.kt', desc: 'Android and JVM compatible' },
                      { lang: 'Swift', ext: '.swift', desc: 'iOS and macOS development' },
                      { lang: 'Scala', ext: '.scala', desc: 'Functional and OOP hybrid' }
                    ]?.map((language, index) => (
                      <div key={index} className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-text-primary">{language?.lang}</h3>
                          <code className="text-xs bg-background px-2 py-1 rounded text-text-secondary">
                            {language?.ext}
                          </code>
                        </div>
                        <p className="text-sm text-text-secondary">{language?.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'features' && (
              <section className="space-y-8">
                <div id="core-features" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Core Capabilities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Real-time Translation',
                        description: 'Stream-based AI translation with live progress updates and cancellation support',
                        features: ['Progressive output display', 'Cancellable operations', 'Real-time feedback', 'Error recovery']
                      },
                      {
                        title: 'Multi-language Support',
                        description: 'Comprehensive support for 13+ programming languages with intelligent conversion',
                        features: ['Cross-language compatibility', 'Syntax preservation', 'Best practice adoption', 'Language-specific optimizations']
                      },
                      {
                        title: 'Quality Assessment',
                        description: 'Advanced metrics and scoring system for translation quality evaluation',
                        features: ['Accuracy scoring', 'Logic preservation analysis', 'Code quality metrics', 'Improvement suggestions']
                      },
                      {
                        title: 'User Experience',
                        description: 'Modern, intuitive interface designed for developer productivity',
                        features: ['Dark/Light themes', 'Responsive design', 'Keyboard shortcuts', 'Copy-to-clipboard']
                      }
                    ]?.map((feature, index) => (
                      <div key={index} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">{feature?.title}</h3>
                        <p className="text-text-secondary mb-4">{feature?.description}</p>
                        <div className="space-y-2">
                          {feature?.features?.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="text-sm text-text-secondary">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="user-interface" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    User Interface Components
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Interface Layout</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { component: 'Header Navigation', description: 'Application branding, theme toggle, and main navigation controls' },
                          { component: 'Translation Controls', description: 'Language selectors, translate button, and language swap functionality' },
                          { component: 'Code Editors', description: 'Dual-pane editor with syntax highlighting and line numbers' },
                          { component: 'Progress Indicator', description: 'Real-time translation progress with cancellation option' },
                          { component: 'Quality Metrics', description: 'Comprehensive accuracy scores and improvement suggestions' },
                          { component: 'Error Display', description: 'User-friendly error messages with retry and dismiss options' }
                        ]?.map((ui, index) => (
                          <div key={index} className="p-4 bg-background rounded border border-border">
                            <h4 className="font-medium text-text-primary mb-2">{ui?.component}</h4>
                            <p className="text-sm text-text-secondary">{ui?.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Responsive Design Features</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-text-primary mb-3">Desktop Experience</h4>
                          <ul className="text-sm text-text-secondary space-y-2">
                            <li>• Side-by-side code editor layout</li>
                            <li>• Full-width navigation and controls</li>
                            <li>• Keyboard shortcuts and hotkeys</li>
                            <li>• Multi-monitor support optimization</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-3">Mobile Experience</h4>
                          <ul className="text-sm text-text-secondary space-y-2">
                            <li>• Stacked editor layout for small screens</li>
                            <li>• Touch-optimized controls and buttons</li>
                            <li>• Swipe gestures for navigation</li>
                            <li>• Optimized typography and spacing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="quality-metrics" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Quality Metrics & Analytics
                  </h2>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Metric Visualization</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-text-primary">Progress Indicators</h4>
                            <div className="space-y-3">
                              {[
                                { label: 'Overall Confidence', value: 94, color: 'bg-green-500' },
                                { label: 'Syntax Accuracy', value: 97, color: 'bg-blue-500' },
                                { label: 'Logic Preservation', value: 89, color: 'bg-yellow-500' },
                                { label: 'Code Quality', value: 91, color: 'bg-purple-500' }
                              ]?.map((metric, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-text-primary">{metric?.label}</span>
                                    <span className="text-text-secondary">{metric?.value}%</span>
                                  </div>
                                  <div className="w-full bg-background rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${metric?.color}`} 
                                      style={{ width: `${metric?.value}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-text-primary mb-4">Performance Stats</h4>
                            <div className="space-y-3">
                              {[
                                { stat: 'Processing Time', value: '2.3 seconds' },
                                { stat: 'Lines Translated', value: '45 lines' },
                                { stat: 'Source Lines', value: '42 lines' },
                                { stat: 'Translation Efficiency', value: '107%' }
                              ]?.map((stat, index) => (
                                <div key={index} className="flex justify-between p-3 bg-background rounded border border-border">
                                  <span className="text-text-primary font-medium">{stat?.stat}</span>
                                  <span className="text-text-secondary">{stat?.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Improvement Suggestions</h3>
                        <div className="space-y-3">
                          {[
                            'Translation completed successfully with excellent code quality',
                            'Consider adding type annotations for enhanced TypeScript compatibility',
                            'Code structure preserved with modern language conventions applied'
                          ]?.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-background rounded border border-border">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-text-secondary">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'usage' && (
              <section className="space-y-8">
                <div id="getting-started" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Getting Started Guide
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Start Steps</h3>
                      <div className="space-y-4">
                        {[
                          {
                            step: 1,
                            title: 'Setup Environment',
                            description: 'Ensure you have a valid Gemini API key configured in your environment variables',
                            code: 'VITE_GEMINI_API_KEY=your_api_key_here'
                          },
                          {
                            step: 2,
                            title: 'Select Languages',
                            description: 'Choose your source programming language and desired target language from the dropdown menus',
                            tip: 'You can swap languages instantly using the swap button'
                          },
                          {
                            step: 3,
                            title: 'Input Source Code',
                            description: 'Paste or type your source code in the left editor panel',
                            tip: 'Line numbers and basic syntax highlighting are provided'
                          },
                          {
                            step: 4,
                            title: 'Start Translation',
                            description: 'Click the "Translate Code" button to begin the AI-powered translation process',
                            tip: 'Progress will be shown in real-time with option to cancel'
                          },
                          {
                            step: 5,
                            title: 'Review Results',
                            description: 'Examine the translated code and quality metrics to ensure accuracy',
                            tip: 'Use the copy button to easily transfer code to your project'
                          }
                        ]?.map((step) => (
                          <div key={step?.step} className="flex gap-4 p-4 bg-background rounded border border-border">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                              {step?.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-text-primary mb-2">{step?.title}</h4>
                              <p className="text-text-secondary text-sm mb-2">{step?.description}</p>
                              {step?.code && (
                                <code className="text-xs bg-card px-3 py-1 rounded text-text-secondary border border-border block mb-2">
                                  {step?.code}
                                </code>
                              )}
                              {step?.tip && (
                                <p className="text-xs text-primary font-medium">💡 Tip: {step?.tip}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Example Translation</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">JavaScript Input</h4>
                          <div className="bg-background p-4 rounded border border-border">
                            <pre className="text-sm text-text-secondary overflow-x-auto">
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`}
                            </pre>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Python Output</h4>
                          <div className="bg-background p-4 rounded border border-border">
                            <pre className="text-sm text-text-secondary overflow-x-auto">
{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="best-practices" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Best Practices & Tips
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Input Optimization</h3>
                      <div className="space-y-3">
                        {[
                          'Use clear, well-commented source code for better translation accuracy',
                          'Break down large code blocks into smaller, focused functions',
                          'Ensure proper indentation and formatting in source code',
                          'Include necessary imports and dependencies in context',
                          'Avoid overly complex or nested logic when possible'
                        ]?.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Output Validation</h3>
                      <div className="space-y-3">
                        {[
                          'Always review translated code for logical correctness',
                          'Test translated code in target language environment',
                          'Check for language-specific best practices compliance',
                          'Verify that all edge cases are properly handled',
                          'Consider performance implications of translation choices'
                        ]?.map((practice, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary text-sm">{practice}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Performance Tips</h3>
                      <div className="space-y-3">
                        {[
                          'Use streaming translation for large code blocks',
                          'Cancel unnecessary translations to save API credits',
                          'Leverage dark mode for reduced eye strain during long sessions',
                          'Copy results immediately after translation completion',
                          'Clear editors between different translation tasks'
                        ]?.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Quality Assurance</h3>
                      <div className="space-y-3">
                        {[
                          'Pay attention to quality metric scores and suggestions',
                          'Cross-reference translations with language documentation',
                          'Use version control to track translation changes',
                          'Document any manual adjustments made post-translation',
                          'Share feedback to help improve translation accuracy'
                        ]?.map((qa, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary text-sm">{qa}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="troubleshooting" className="space-y-4">
                  <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-2">
                    Troubleshooting Guide
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        issue: 'API Key Configuration Error',
                        symptoms: ['Error message about missing API key', 'Translation button disabled', 'Authentication failures'],
                        solutions: [
                          'Verify VITE_GEMINI_API_KEY is set in environment variables',
                          'Check API key format and validity in Google AI Studio',
                          'Restart development server after adding environment variables',
                          'Ensure .env file is in project root directory'
                        ]
                      },
                      {
                        issue: 'Translation Quality Issues',
                        symptoms: ['Low accuracy scores', 'Syntax errors in output', 'Incomplete translations'],
                        solutions: [
                          'Simplify complex code structures before translation',
                          'Add more context and comments to source code',
                          'Try breaking large functions into smaller components',
                          'Verify source code is syntactically correct'
                        ]
                      },
                      {
                        issue: 'Performance Problems',
                        symptoms: ['Slow translation responses', 'Timeout errors', 'High API usage'],
                        solutions: [
                          'Use streaming translation for better responsiveness',
                          'Reduce code block size for faster processing',
                          'Check internet connection stability',
                          'Monitor API quota and usage limits'
                        ]
                      },
                      {
                        issue: 'Interface Issues',
                        symptoms: ['Editor not displaying correctly', 'Theme not applying', 'Copy function not working'],
                        solutions: [
                          'Clear browser cache and reload the page',
                          'Disable browser extensions that might interfere',
                          'Check browser JavaScript console for errors',
                          'Try using a different browser or incognito mode'
                        ]
                      }
                    ]?.map((trouble, index) => (
                      <div key={index} className="bg-card p-6 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-text-primary mb-4 text-red-600 dark:text-red-400">
                          {trouble?.issue}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-text-primary mb-3">Common Symptoms</h4>
                            <ul className="space-y-2">
                              {trouble?.symptoms?.map((symptom, sIndex) => (
                                <li key={sIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                                  <span className="text-red-500 mt-1">•</span>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary mb-3">Solutions</h4>
                            <ul className="space-y-2">
                              {trouble?.solutions?.map((solution, solIndex) => (
                                <li key={solIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                                  <span className="text-green-500 mt-1">✓</span>
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Contact & Support</h3>
                      <p className="text-text-secondary mb-4">
                        If you continue to experience issues after trying these solutions, consider the following resources:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-background rounded border border-border text-center">
                          <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                          <h4 className="font-medium text-text-primary mb-1">Documentation</h4>
                          <p className="text-sm text-text-secondary">Review this comprehensive guide</p>
                        </div>
                        <div className="p-4 bg-background rounded border border-border text-center">
                          <ExternalLink className="w-6 h-6 text-primary mx-auto mb-2" />
                          <h4 className="font-medium text-text-primary mb-1">Google AI Studio</h4>
                          <p className="text-sm text-text-secondary">Check API status and quotas</p>
                        </div>
                        <div className="p-4 bg-background rounded border border-border text-center">
                          <Search className="w-6 h-6 text-primary mx-auto mb-2" />
                          <h4 className="font-medium text-text-primary mb-1">Browser Console</h4>
                          <p className="text-sm text-text-secondary">Check for JavaScript errors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationHub;