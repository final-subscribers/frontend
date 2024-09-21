import axios from 'axios';
import { loginSchema } from '@/types/types';
import { BASE_URL } from '@/lib/constants';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const getAuthHeaders = () => {
  const token = getCookie('accessToken');
  return token ? { 'access-token': token } : {};
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });

    const result = loginSchema.safeParse(response.data);
    let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
    }

    const accessToken = response.data.accessToken;
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
      console.log('Access token saved to cookie:', accessToken);
    } else {
      throw new Error('No access token in response data');
    }

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true, access_token: accessToken };
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const logout = () => {
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
