import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
// import axios from 'axios';

// axios.defaults.withCredentials = true; // 쿠기 허용

const queryClient = new QueryClient();
async function deferRender() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser.ts');
    await worker.start();
  }
}
deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
