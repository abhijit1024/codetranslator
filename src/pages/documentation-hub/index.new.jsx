import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import useTheme from '../../hooks/useTheme';
import { BookOpen, ArrowLeft, Search, Bookmark, ExternalLink, Code, Zap, Cpu, Settings, Terminal, Lightbulb } from 'lucide-react';
import DocumentationContent from './DocumentationContent';

const DocumentationHub = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // Documentation sections data
  const documentationSections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BookOpen,
      subsections: [
        { id: 'introduction', title: 'Introduction', href: '#introduction' },
        { id: 'features', title: 'Key Features', href: '#features' },
        { id: 'getting-started', title: 'Getting Started', href: '#getting-started' }
      ]
    },
    {
      id: 'guide',
      title: 'User Guide',
      icon: BookOpen,
      subsections: [
        { id: 'best-practices', title: 'Best Practices', href: '#best-practices' },
        { id: 'examples', title: 'Examples', href: '#examples' },
        { id: 'troubleshooting', title: 'Troubleshooting', href: '#troubleshooting' }
      ]
    },
    {
      id: 'reference',
      title: 'API Reference',
      icon: Code,
      subsections: [
        { id: 'api-reference', title: 'translateCode', href: '#api-reference' },
        { id: 'configuration', title: 'Configuration', href: '#configuration' },
        { id: 'error-handling', title: 'Error Handling', href: '#error-handling' }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      icon: Lightbulb,
      subsections: [
        { id: 'faq', title: 'FAQ', href: '#faq' },
        { id: 'support', title: 'Get Help', href: '#support' },
        { id: 'contributing', title: 'Contributing', href: '#contributing' }
      ]
    }
  ];

  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedSections, setBookmarkedSections] = useState([]);

  // Handle bookmark toggle
  const toggleBookmark = (sectionId) => {
    setBookmarkedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Filter sections based on search
  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections.some(sub => 
      sub.title.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link 
                to="/"
                className="p-2 rounded-lg bg-background hover:bg-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-text-secondary" />
              </Link>
              <h2 className="text-lg font-semibold text-text-primary">Documentation</h2>
            </div>

            {/* Search Functionality */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2">
              {filteredSections.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeSection === section.id;
                const isBookmarked = bookmarkedSections.includes(section.id);

                return (
                  <div key={section.id} className="space-y-1">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent text-text-primary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(section.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          isBookmarked ? 'text-yellow-500' : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </button>

                    {/* Subsections */}
                    {isActive && section.subsections && (
                      <div className="ml-7 space-y-1">
                        {section.subsections.map((subsection) => (
                          <a
                            key={subsection.id}
                            href={subsection.href}
                            className="block p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-accent rounded transition-all"
                          >
                            {subsection.title}
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
        <main className="ml-80 flex-1 p-8 max-w-none overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <DocumentationContent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationHub;
