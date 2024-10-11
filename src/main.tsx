import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } catch (error) {
    console.error('Error rendering the app:', error);
    rootElement.innerHTML = '<div style="color: red;">Error rendering the application. Please check the console for more details.</div>';
  }
} else {
  console.error('Root element not found');
}