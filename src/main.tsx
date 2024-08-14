import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';

const queryClient = new QueryClient();
// async function deferRender() {
//   const { worker } = await import('./mocks/browser.ts');
//   return worker.start();
// }
// deferRender().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
// });
