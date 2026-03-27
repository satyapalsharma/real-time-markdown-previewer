import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * @file src/utils/markdownConverter.js
 * @description Utility for converting Markdown text to sanitized HTML.
 * This module leverages the 'marked' library for parsing Markdown and 'DOMPurify'
 * for sanitizing the resulting HTML to prevent XSS attacks.
 */

// Configure marked.js for common Markdown features.
// For a real-time previewer, we want to be relatively permissive but secure.
marked.setOptions({
  gfm: true, // Use GitHub Flavored Markdown (tables, strikethrough, task lists)
  breaks: true, // Convert line breaks to <br> (useful for simple text editing)
  // highlight: function(code, lang) {
  //   // Optional: Add syntax highlighting if a library like 'highlight.js' is available
  //   // if (lang && hljs.getLanguage(lang)) {
  //   //   return hljs.highlight(code, { language: lang }).value;
  //   // }
  //   return code;
  // },
  // For production, consider using a custom renderer for more control over output
  // renderer: new marked.Renderer(),
});

/**
 * Converts a Markdown string into a sanitized HTML string.
 *
 * This function first parses the Markdown using `marked.js` and then
 * sanitizes the resulting HTML using `DOMPurify` to mitigate potential
 * cross-site scripting (XSS) vulnerabilities.
 *
 * @param {string} markdownText The Markdown string to convert.
 * @returns {string} The sanitized HTML string.
 */
export const convertMarkdownToHtml = (markdownText) => {
  if (typeof markdownText !== 'string') {
    console.warn('convertMarkdownToHtml received non-string input:', markdownText);
    return '';
  }

  // 1. Convert Markdown to raw HTML using marked.js
  // marked.parse returns a Promise in newer versions, but for synchronous use
  // with simple text, it often works synchronously. For larger inputs or
  // more complex scenarios, consider an async approach or ensure marked's
  // configuration allows synchronous parsing.
  const rawHtml = marked.parse(markdownText);

  // 2. Sanitize the raw HTML using DOMPurify
  // This is crucial for security, especially when displaying user-generated content.
  // DOMPurify will strip out potentially malicious elements and attributes.
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }, // Use the default HTML profile
    // Optional: Configure DOMPurify further if specific elements/attributes
    // need to be allowed or disallowed beyond the defaults.
    // e.g., ALLOWED_TAGS: ['p', 'a', 'strong', 'em', 'h1', 'h2', 'ul', 'li', 'img', 'pre', 'code'],
    //       ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
  });

  return sanitizedHtml;
};

// You might also export the marked instance directly if other parts of the app
// need to interact with its configuration or renderer.
// export { marked };
// export { DOMPurify }; // Less common to export DOMPurify directly from a utility like this.
