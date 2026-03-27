import React from 'react';
import PropTypes from 'prop-types';

/**
 * MarkdownPreview Component
 *
 * Displays the HTML content generated from Markdown.
 * It uses `dangerouslySetInnerHTML` to render the raw HTML string.
 *
 * @param {object} props - The component's props.
 * @param {string} props.htmlContent - The HTML string to be rendered.
 * @returns {JSX.Element} A div element containing the rendered HTML.
 */
const MarkdownPreview = ({ htmlContent }) => {
  return (
    <div
      className="markdown-preview"
      // Using dangerouslySetInnerHTML is necessary here because we are
      // rendering a raw HTML string that has been converted from Markdown.
      // React intentionally makes this difficult to prevent XSS attacks.
      // In this specific application, the input is user-generated Markdown,
      // and the conversion library (like 'marked') should handle sanitization.
      // For production applications with untrusted input, ensure robust
      // server-side sanitization or a client-side library that explicitly
      // sanitizes the output HTML.
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      aria-live="polite" // Announce changes to assistive technologies
      aria-atomic="true" // Announce the entire region as a single unit
      role="region" // Define this as a landmark region
      aria-label="Markdown Preview" // Provide an accessible label
    />
  );
};

// Define prop types for better type checking and documentation
MarkdownPreview.propTypes = {
  /**
   * The HTML string content to be displayed.
   * This string is expected to be the result of Markdown conversion.
   */
  htmlContent: PropTypes.string.isRequired,
};

export default MarkdownPreview;