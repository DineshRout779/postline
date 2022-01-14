import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
