import { apiRequest } from './client';
import { loginResponseSchema, type LoginFormData } from '../validations/auth';
import type { LoginResponse } from '@/types/auth';

export async function loginUser(
  credentials: LoginFormData
): Promise<LoginResponse> {
  const response = await apiRequest<unknown>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  // Valida a resposta com Zod
  const validatedResponse = loginResponseSchema.parse(response);
  return validatedResponse;
}

export function saveAuthData(token: string, user: LoginResponse['user']) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
}

export function getAuthData(): { token: string | null; user: any | null } {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const token = localStorage.getItem('auth_token');
  const userStr = localStorage.getItem('auth_user');
  
  try {
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
}
