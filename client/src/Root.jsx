import React from 'react';
import App from './components/App';
import { CookiesProvider } from 'react-cookie';
 
export default function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}