import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your global stylesheet

/**
 * This is the main entry point for the React application.
 * It gets the root element from the HTML and tells React to render
 * the main App component inside of it.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode is a wrapper that helps find potential problems in an app.
  // It doesn't render any visible UI and only runs in development mode.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);