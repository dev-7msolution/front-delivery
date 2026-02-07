import { apiRequest, getAuthHeader } from './client';
import { categoryResponseSchema } from '../validations/category';
import type { Category, CreateCategoryData } from '@/types/category';

export async function getCategories(
  empresaId: number,
  token: string
): Promise<Category[]> {
  const response = await apiRequest<unknown>(`/categoria/${empresaId}`, {
    headers: getAuthHeader(token),
  });

  const validated = categoryResponseSchema.parse(response);
  return validated.resultado;
}

export async function createCategory(
  data: CreateCategoryData,
  empresaId: number,
  token: string
): Promise<void> {
  await apiRequest(`/categoria`, {
    method: 'POST',
    headers: getAuthHeader(token),
    body: JSON.stringify({
      ...data,
      id_empresa: empresaId,
    }),
  });
}

export async function updateCategory(
  id: number,
  data: CreateCategoryData,
  token: string
): Promise<void> {
  await apiRequest(`/categoria/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(token),
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(
  id: number,
  token: string
): Promise<void> {
  await apiRequest(`/categoria/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(token),
  });
}
