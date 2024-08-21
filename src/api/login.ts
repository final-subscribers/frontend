import axios from 'axios';
import { loginSchema } from '@/types/types';

const API_BASE_URL = URL;

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('accessToken');
  return token ? { 'access-token': token } : {};
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/login`, { email, password });

    const result = loginSchema.safeParse(response);
    let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
    }

    const token = response.headers['access-token'];
    if (token) {
      sessionStorage.setItem('accessToken', token);
      console.log('Access token saved to sessionStorage:', token);
    } else {
      throw new Error('No access token in response headers');
    }

    return Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true, access_token: token };
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
};
