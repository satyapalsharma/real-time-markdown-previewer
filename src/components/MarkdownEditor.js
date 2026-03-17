import React from 'react';

/**
 * @typedef {Object} MarkdownEditorProps
 * @property {string} markdownText - The current Markdown text to display in the editor.
 * @property {(newText: string) => void} onMarkdownChange - Callback function to be called when the text in the editor changes.
 */

/**
 * MarkdownEditor Component
 * Renders a textarea for users to input Markdown text.
 * It's a controlled component, receiving its value and change handler from props.
 *
 * @param {MarkdownEditorProps} props - The props for the component.
 * @returns {JSX.Element} The Markdown editor component.
 */
function MarkdownEditor({ markdownText, onMarkdownChange }) {
  /**
   * Handles changes to the textarea.
   * Calls the `onMarkdownChange` prop with the new value from the textarea.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event from the textarea.
   */
  const handleChange = (event) => {
    onMarkdownChange(event.target.value);
  };

  return (
    <div className="markdown-editor-container">
      {/*
        A visually hidden label for accessibility.
        Screen readers will announce this label for the textarea,
        providing context without cluttering the UI.
        The 'sr-only' class would typically hide it visually while keeping it accessible.
      */}
      <label htmlFor="markdown-input" className="sr-only">
        Enter your Markdown here
      </label>
      <textarea
        id="markdown-input"
        className="markdown-editor-textarea"
        placeholder="Start typing your Markdown here..."
        value={markdownText}
        onChange={handleChange}
        aria-label="Markdown input editor"
        spellCheck="false" // Disable spell check as Markdown often contains code snippets or specific syntax
        autoFocus // Automatically focus the editor when the component mounts for immediate typing
      />
    </div>
  );
}

export default MarkdownEditor;