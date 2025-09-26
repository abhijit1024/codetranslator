import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import App from './App';
import './styles/tailwind.css';
import './index.css';

const root = createRoot(document.getElementById('root'));

// Simple ErrorBoundary replacement for debugging
const SimpleErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error('Error in SimpleErrorBoundary:', error);
    return <div style={{ color: 'red', padding: '20px' }}>
      <h1>Something went wrong</h1>
      <pre>{error.toString()}</pre>
    </div>;
  }
};

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SimpleErrorBoundary>
          <ScrollToTop />
          <App />
        </SimpleErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
