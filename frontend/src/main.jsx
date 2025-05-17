import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Gestore degli errori globale
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Previene il comportamento predefinito che causerebbe la pagina bianca
  event.preventDefault();
});

// Gestore delle promesse non gestite
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Previene il comportamento predefinito
  event.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
