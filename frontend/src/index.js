import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from '../src/pages/Homepage'
// import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>
);

reportWebVitals();
