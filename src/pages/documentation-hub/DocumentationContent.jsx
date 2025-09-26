import React from 'react';
import { BookOpen, Code, Zap, Cpu, Settings, Terminal, Lightbulb } from 'lucide-react';

const DocumentationContent = () => {
  return (
    <div className="prose prose-lg max-w-none text-text-secondary dark:prose-invert">
      {/* Introduction */}
      <section id="introduction" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Introduction to CodeTranslator
        </h2>
        <p className="text-lg">
          CodeTranslator is an advanced AI-powered tool that helps developers convert code between different programming languages 
          with high accuracy while preserving functionality and structure.
        </p>
      </section>

      {/* Key Features */}
      <section id="features" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <Cpu className="w-6 h-6 text-blue-500" />,
              title: 'AI-Powered',
              description: 'Leverages cutting-edge AI models for accurate code translation'
            },
            {
              icon: <Zap className="w-6 h-6 text-yellow-500" />,
              title: 'Fast & Efficient',
              description: 'Quickly translates code with minimal processing time'
            },
            {
              icon: <Code className="w-6 h-6 text-green-500" />,
              title: 'Multiple Languages',
              description: 'Supports popular programming languages including Python, JavaScript, Java, and more'
            },
            {
              icon: <Settings className="w-6 h-6 text-purple-500" />,
              title: 'Customizable',
              description: 'Adjust settings for code style, formatting, and optimization'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                {feature.icon}
                <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
              </div>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Getting Started
        </h2>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-text-primary mb-3">1. Installation</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
              <code>npm install codetranslator</code>
            </pre>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-text-primary mb-3">2. Basic Usage</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
              <code>{`import { translateCode } from 'codetranslator';

const result = await translateCode({
  code: 'console.log("Hello, World!");',
  from: 'javascript',
  to: 'python'
});

console.log(result.translatedCode);`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section id="best-practices" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Best Practices
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-text-primary">Keep Code Modular</h4>
              <p className="text-text-secondary">Break down large codebases into smaller, manageable modules for better translation accuracy.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-text-primary">Review Translations</h4>
              <p className="text-text-secondary">Always review the translated code for accuracy and make necessary adjustments.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-text-primary">Use Clear Naming</h4>
              <p className="text-text-secondary">Use descriptive variable and function names to improve translation quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Troubleshooting
        </h2>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-text-primary mb-3">Translation Errors</h3>
            <p className="text-text-secondary mb-4">If you encounter translation errors, try the following:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Check for syntax errors in your source code</li>
              <li>Ensure the source and target languages are correctly specified</li>
              <li>Break down complex expressions into simpler ones</li>
              <li>Update to the latest version of the package</li>
            </ul>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-text-primary mb-3">Performance Issues</h3>
            <p className="text-text-secondary">For large codebases, consider:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-text-secondary">
              <li>Translating code in smaller chunks</li>
              <li>Using the streaming API for real-time feedback</li>
              <li>Optimizing your code before translation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          API Reference
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">translateCode(options)</h3>
            <p className="text-text-secondary mb-4">Translates code from one programming language to another.</p>
            
            <h4 className="font-semibold text-text-primary mb-2">Parameters:</h4>
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border border-border rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-text-primary">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-text-primary">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-text-primary">Required</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-text-primary">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2 text-sm text-text-secondary">code</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">string</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Yes</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Source code to translate</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-text-secondary">from</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">string</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Yes</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Source programming language</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-text-secondary">to</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">string</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Yes</td>
                    <td className="px-4 py-2 text-sm text-text-secondary">Target programming language</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-text-primary mb-2">Returns:</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <pre className="text-sm"><code>{"{\n  translatedCode: string;\n  sourceLanguage: string;\n  targetLanguage: string;\n  warnings: string[];\n  metrics: {\n    accuracy: number;\n    executionTime: number;\n    tokensUsed: number;\n  }\n}"}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Examples
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">Basic Translation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-2">JavaScript (Source)</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`function greet(name) {
  return \`Hello, ${name}!\`;
}

console.log(greet('World'));`}</code>
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Python (Target)</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`def greet(name):
    return f"Hello, {name}!"

print(greet('World'))`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">Handling Dependencies</h3>
            <p className="text-text-secondary mb-4">
              When translating code with external dependencies, you may need to handle package differences:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-2">Node.js (Source)</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`const axios = require('axios');

async function fetchData() {
  const response = await axios.get('https://api.example.com/data');
  return response.data;
}`}</code>
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Python (Target)</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{`import requests

async def fetch_data():
    response = requests.get('https://api.example.com/data')
    return response.json()`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {[
            {
              question: 'How accurate are the code translations?',
              answer: 'CodeTranslator provides highly accurate translations, but the accuracy can vary depending on the complexity of the code and the languages involved. We recommend reviewing all translated code.'
            },
            {
              question: 'Which programming languages are supported?',
              answer: 'CodeTranslator supports popular languages including Python, JavaScript, Java, C++, C#, Go, Ruby, PHP, TypeScript, and more. The full list is available in the documentation.'
            },
            {
              question: 'Is my code sent to external servers?',
              answer: 'CodeTranslator processes your code locally in the browser. No code is sent to external servers unless you explicitly enable cloud processing for complex translations.'
            },
            {
              question: 'How can I improve translation quality?',
              answer: 'For best results, use clear and consistent code structure, add comments for complex logic, and break down large functions into smaller, more manageable pieces.'
            },
            {
              question: 'Is there a rate limit?',
              answer: 'The free tier has reasonable rate limits. For higher volume usage, consider upgrading to a paid plan with increased limits and priority processing.'
            }
          ].map((item, index) => (
            <div key={index} className="border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-text-primary mb-2">{item.question}</h3>
              <p className="text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support */}
      <section id="support" className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-6 border-b pb-2">
          Support
        </h2>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-text-secondary mb-4">
            Need help? Here's how you can get support:
          </p>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">1</span>
              <span>Check the <a href="#faq" className="text-primary hover:underline">FAQ</a> section</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">2</span>
              <span>Search the <a href="https://github.com/yourusername/codetranslator/discussions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">community discussions</a></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">3</span>
              <span>Open an issue on <a href="https://github.com/yourusername/codetranslator/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a> for bugs or feature requests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">4</span>
              <span>Email us at <a href="mailto:support@codetranslator.com" className="text-primary hover:underline">support@codetranslator.com</a> for direct support</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DocumentationContent;
