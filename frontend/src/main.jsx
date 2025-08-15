import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the App component with BrowserRouter for routing */}
      <AuthProvider> {/* Wrap the App component with AuthProvider to provide authentication context */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

