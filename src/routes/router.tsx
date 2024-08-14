import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '@/pages/LoginSignup/Login';
import SignupTerms from '@/pages/LoginSignup/SignupTerms';
import AdminVerify from '@/pages/LoginSignup/AdminVerify';
import SignupCompleted from '@/pages/LoginSignup/SignupCompleted';

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
        path: '/signup-terms',
        element: <SignupTerms />,
      },
      {
        path: '/admin-verify',
        element: <AdminVerify />,
      },
      {
        path: '/signup-completed',
        element: <SignupCompleted />,
      },
    ],
  },
]);
