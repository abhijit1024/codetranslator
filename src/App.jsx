import React from 'react';
import { useTheme } from './hooks/useTheme';
import Routes from './Routes';

// Component to handle theme changes
const ThemeWrapper = ({ children }) => {
  const { isDarkMode } = useTheme();

  // Apply theme class to the root element
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return children;
};

function App() {
  return (
    <ThemeWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Routes />
      </div>
    </ThemeWrapper>
  );
}

export default App;