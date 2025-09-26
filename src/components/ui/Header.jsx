import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import useTheme from '../../hooks/useTheme';

// Helper function to merge class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Only render theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Active link style
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-lg shadow-md">
                <Icon name="Code2" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeTranslator
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/code-translation"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                isActive('/code-translation')
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
              )}
            >
              Code Translation
            </Link>
            <Link
              to="/documentation-hub"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                isActive('/documentation-hub')
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
              )}
            >
              Documentation
            </Link>
            
            {/* Theme Toggle Button */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
                iconName={isDarkMode ? 'Sun' : 'Moon'}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              />
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-1 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
                iconName={isDarkMode ? 'Sun' : 'Moon'}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
              aria-label="Open menu"
              iconName={isMenuOpen ? 'X' : 'Menu'}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/code-translation"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium',
                isActive('/code-translation')
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Code Translation
            </Link>
            <Link
              to="/documentation-hub"
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium',
                isActive('/documentation-hub')
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};


export default Header;