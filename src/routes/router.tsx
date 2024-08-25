import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '@/pages/LoginSignup/Login';
import SignupCompleted from '@/pages/LoginSignup/SignupCompleted';

import TestHY from '@/pages/TestHY';
import TestYJ from '@/pages/TestYJ';
import TestMS from '@/pages/TestMS';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup-completed',
        element: <SignupCompleted />,
      },
      {
        path: '/test-ms',
        element: <TestMS />,
      },
      {
        path: '/test-hy',
        element: <TestHY />,
      },
      {
        path: '/test-yj',
        element: <TestYJ />,
      },
    ],
  },
]);
