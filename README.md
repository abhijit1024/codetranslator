<div align="center">
  <h1>✨ Code Translator</h1>
  <p>A modern web application that converts your code between programming languages using AI. Built with React, Vite, and Tailwind CSS.</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/code-translator?style=social)](https://github.com/yourusername/code-translator/stargazers)
  [![GitHub issues](https://img.shields.io/github/issues/yourusername/code-translator)](https://github.com/yourusername/code-translator/issues)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcode-translator)
</div>

## 📝 Table of Contents
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Theming](#-theming)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Code Translation** - Seamlessly convert code between multiple programming languages using Google's Gemini AI
- **Intelligent Language Detection** - Automatically detects the input programming language
- **Syntax Highlighting** - Clean, readable code output with syntax highlighting
- **Clipboard Integration** - Copy translated code with a single click
- **Dark/Light Mode** - Toggle between themes for comfortable coding in any environment
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Intuitive interface with smooth animations and transitions

### 🛠️ Developer Experience
- **Modern Tech Stack** - Built with React 18, Vite, and Tailwind CSS
- **Type Safety** - Full TypeScript support for better developer experience
- **Performance Optimized** - Fast loading and smooth interactions
- **Accessibility** - Built with accessibility in mind (WAI-ARIA compliant)
- **SEO Friendly** - Server-side rendering ready

## 🎥 Demo

![Code Translator Demo](https://via.placeholder.com/1200x600/3b82f6/ffffff?text=Code+Translator+Demonstration)

*Screenshots coming soon!*

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Highlighting**: [Prism.js](https://prismjs.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Development Tools
- **Package Manager**: npm/yarn/pnpm
- **Linting**: [ESLint](https://eslint.org/)
- **Code Formatting**: [Prettier](https://prettier.io/)
- **Version Control**: Git
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (or yarn v1.22.x+ / pnpm v7.x+)
- **Git**: Latest stable version
- **Google Gemini API Key**: Required for code translation functionality

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/code-translator.git
cd code-translator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:4003](http://localhost:4003)

### 5. Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🏗️ Project Structure

```
code-translator/
├── public/               # Static assets
│   ├── images/          # Image assets
│   └── favicon.ico      # Favicon
├── src/
│   ├── assets/          # Static assets (fonts, images, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # ShadCN/ui components
│   │   └── ...         # Other components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Page components
│   │   ├── code-translation/
│   │   └── documentation-hub/
│   ├── styles/          # Global styles and CSS utilities
│   ├── utils/           # Helper functions and utilities
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── Routes.jsx       # Application routes
├── .env.example         # Example environment variables
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore file
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🛠️ Available Scripts

In the project directory, you can run:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run tests |

## 🎨 Theming

This project features a comprehensive theming system with the following capabilities:

- **Light/Dark Mode**: Toggle between light and dark themes
- **Custom Themes**: Extend the default theme with custom colors
- **System Preference**: Automatically detects the user's preferred color scheme

To toggle between themes, use the theme switcher in the header.

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcode-translator)

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your `VITE_GEMINI_API_KEY` as an environment variable
4. Deploy!

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/code-translator)

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your preferred static hosting service.

## 🚨 Troubleshooting

### Common Issues

#### Missing Environment Variables
- Ensure you've created a `.env.local` file with the required variables
- Make sure the variable names in `.env.local` match those expected by the application

#### Port Already in Use
If you encounter a port conflict:

```bash
# Find the process using the port
lsof -i :4003

# Kill the process (replace PID with the actual process ID)
kill -9 PID
```

#### Dependency Issues
If you encounter dependency issues:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the project
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Workflow

1. Create a new branch for your feature or bugfix
2. Write tests for your changes
3. Ensure all tests pass
4. Update the documentation if necessary
5. Submit a pull request

### Code Style
- Follow the existing code style
- Use meaningful commit messages
- Keep pull requests focused on a single feature or bugfix
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - For powering the code translation
- [ShadCN/UI](https://ui.shadcn.com/) - For the beautiful UI components
- [Vite](https://vitejs.dev/) - For the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - For the beautiful icons
- [React](https://reactjs.org/) - For making UI development fun and efficient

## 👏 Show Your Support

Give a ⭐️ if this project helped you!

## 📝 Todo

- [ ] Add more language support
- [ ] Implement code diff view
- [ ] Add unit and integration tests
- [ ] Add end-to-end testing
- [ ] Add CI/CD pipeline
- [ ] Add more documentation
- [ ] Add internationalization (i18n) support

## 🚀 Features

- **AI-Powered Code Translation** - Seamlessly convert code between multiple programming languages
- **Dark/Light Mode** - Toggle between themes for comfortable coding in any environment
- **Modern Tech Stack** - Built with React 18, Vite, and Tailwind CSS
- **Responsive Design** - Works on desktop and mobile devices
- **Code Syntax Highlighting** - Clean, readable code output with syntax highlighting
- **Clipboard Integration** - Copy translated code with a single click

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Code Highlighting**: Prism.js
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v16.x or higher recommended)
- npm (v8.x or higher) or yarn (v1.22.x or higher)
- Google Gemini API Key (for code translation)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/code-translator.git
cd code-translator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:4003`

## 🏗️ Project Structure

```
code-translator/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # ShadCN/ui components
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   │   ├── code-translation/
│   │   └── documentation-hub/
│   ├── styles/          # Global styles and Tailwind configuration
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── Routes.jsx       # Application routes
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🛠️ Available Scripts

- `npm run dev` or `yarn dev` - Start the development server
- `npm run build` or `yarn build` - Build the application for production
- `npm run preview` or `yarn preview` - Preview the production build locally
- `npm run lint` or `yarn lint` - Run ESLint
- `npm run format` or `yarn format` - Format code with Prettier

## 🎨 Theming

This project uses a custom theme system with dark/light mode support. The theme can be toggled using the theme switcher in the header.

## 🌐 Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production build.

### Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcode-translator)

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your `VITE_GEMINI_API_KEY` as an environment variable
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) - For powering the code translation
- [ShadCN/UI](https://ui.shadcn.com/) - For the beautiful UI components
- [Vite](https://vitejs.dev/) - For the amazing development experience
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

---


