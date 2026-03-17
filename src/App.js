import React, { useState, useCallback, useMemo } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import { convertMarkdownToHtml } from './utils/markdownConverter';
import './App.css';

/**
 * App component serves as the main container for the Real-time Markdown Previewer.
 * It manages the markdown text state and orchestrates the MarkdownEditor and MarkdownPreview components.
 */
function App() {
  // Initialize markdownText state with some example content to showcase features.
  const [markdownText, setMarkdownText] = useState(
    `# Welcome to the Real-time Markdown Previewer!

This is a **simple** and *effective* tool to see your Markdown rendered instantly.

## Features
- **Real-time Conversion**: Type on the left, see the result on the right.
- **Syntax Highlighting**: Supports various Markdown elements.
- **Scroll Sync**: (Future enhancement idea)

### How to use
Just start typing in the editor on the left.

\`\`\`javascript
// Example code block
function helloWorld() {
  console.log("Hello, Markdown!");
}
\`\`\`

You can also include:
- Lists
  - Nested lists
- [Links](https://www.example.com)
- Images: ![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
  *(Note: Image rendering depends on external URLs and browser security policies)*

> Blockquotes are also supported.

---

Enjoy converting your Markdown!
`
  );

  /**
   * Handles changes in the Markdown editor.
   * This callback is memoized to prevent unnecessary re-renders of child components
   * that depend on this function, assuming they are wrapped with React.memo.
   *
   * @param {string} newText - The new Markdown text from the editor.
   */
  const handleMarkdownChange = useCallback((newText) => {
    setMarkdownText(newText);
  }, []); // No dependencies, as `setMarkdownText` is stable.

  /**
   * Memoizes the HTML conversion result.
   * This prevents `convertMarkdownToHtml` from being called on every render
   * if `markdownText` has not changed, optimizing performance for the preview component.
   */
  const previewHtml = useMemo(() => {
    return convertMarkdownToHtml(markdownText);
  }, [markdownText]); // Recalculate only when markdownText changes.

  return (
    <div className="app">
      <header className="app-header">
        <h1>Real-time Markdown Previewer</h1>
      </header>
      <main className="app-main">
        {/* MarkdownEditor component for input */}
        <MarkdownEditor
          markdownText={markdownText}
          onMarkdownChange={handleMarkdownChange}
        />
        {/* MarkdownPreview component for displaying converted HTML */}
        <MarkdownPreview
          htmlContent={previewHtml}
        />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Real-time Markdown Previewer</p>
      </footer>
    </div>
  );
}

export default App;