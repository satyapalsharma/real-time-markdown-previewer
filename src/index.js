import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for the application
import App from './App'; // The main application component

/**
 * This is the entry point of the React application.
 * It renders the root App component into the DOM.
 */

// Find the root DOM element where the React application will be mounted.
// This element is typically defined in public/index.html.
const rootElement = document.getElementById('root');

// Create a React root using ReactDOM.createRoot().
// This is the modern way to render React applications, introduced in React 18.
const root = ReactDOM.createRoot(rootElement);

// Render the main App component into the root.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants during development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);