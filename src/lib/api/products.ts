import { apiRequest, getAuthHeader } from './client';
import { z } from 'zod';

// Schema para categoria aninhada no produto
const categoryNestedSchema = z.object({
  id_categoria: z.number(),
  id_empresa: z.number(),
  nome_categoria: z.string(),
  ativo: z.number(),
  data_cadastrou: z.string(),
  data_update: z.string().nullable(),
  icon: z.string().nullable().optional(),
});

// Schema para um produto individual da API
const productApiSchema = z.object({
  id_produto: z.number(),
  id_empresa: z.number(),
  id_categoria: z.number(),
  nome_produto: z.string(),
  valor: z.number(),
  ativo: z.number(),
  data_cadastrou: z.string(),
  descricao: z.string(),
  categoria: categoryNestedSchema.optional(),
});

// Schema para resposta do GET (com status e resultado)
const getProductsResponseSchema = z.object({
  status: z.boolean(),
  resultado: z.array(productApiSchema),
});

// Schema para criação de produto (payload para API)
const createProductApiSchema = z.object({
  nome_produto: z.string(),
  id_categoria: z.number(),
  valor: z.number(),
  descricao: z.string(),
});

// Schema para atualização de produto
const updateProductApiSchema = z.object({
  nome_produto: z.string().optional(),
  id_categoria: z.number().optional(),
  valor: z.number().optional(),
  descricao: z.string().optional(),
  ativo: z.number().optional(),
});

type ProductApiResponse = z.infer<typeof productApiSchema>;
type CreateProductApiPayload = z.infer<typeof createProductApiSchema>;
type UpdateProductApiPayload = z.infer<typeof updateProductApiSchema>;

// Função para transformar dados do frontend para API
function toApiFormat(data: {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  active?: boolean;
}): CreateProductApiPayload {
  return {
    nome_produto: data.name,
    id_categoria: data.categoryId,
    valor: data.price,
    descricao: data.description,
  };
}

// Função para transformar dados da API para frontend
function fromApiFormat(data: ProductApiResponse) {
  return {
    id: data.id_produto,
    name: data.nome_produto,
    description: data.descricao,
    price: data.valor,
    categoryId: data.id_categoria,
    empresaId: data.id_empresa,
    active: data.ativo === 1,
    createdAt: data.data_cadastrou,
    categoryName: data.categoria?.nome_categoria,
  };
}

/**
 * Buscar todos os produtos de uma empresa
 */
export async function getProducts(empresaId: number, token: string) {
  const response = await apiRequest<unknown>(
    `/produto/${empresaId}`,
    {
      method: 'GET',
      headers: getAuthHeader(token),
    }
  );

  // Validar e transformar resposta
  const validatedResponse = getProductsResponseSchema.safeParse(response);
  
  if (!validatedResponse.success) {
    console.error('Erro ao validar produtos:', validatedResponse.error);
    throw new Error('Formato de resposta inválido');
  }

  return validatedResponse.data.resultado.map(fromApiFormat);
}

/**
 * Criar novo produto
 */
export async function createProduct(
  empresaId: number,
  data: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
  },
  token: string
) {
  const payload = toApiFormat(data);
  
  // Validar payload antes de enviar
  const validatedPayload = createProductApiSchema.safeParse(payload);
  
  if (!validatedPayload.success) {
    console.error('Erro ao validar payload:', validatedPayload.error);
    throw new Error('Dados inválidos para criação de produto');
  }

  await apiRequest<unknown>(
    `/produto/${empresaId}`,
    {
      method: 'POST',
      headers: getAuthHeader(token),
      body: JSON.stringify(validatedPayload.data),
    }
  );
}

/**
 * Atualizar produto existente
 */
export async function updateProduct(
  productId: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    active?: boolean;
  },
  token: string
) {
  const payload: UpdateProductApiPayload = {};
  
  if (data.name !== undefined) payload.nome_produto = data.name;
  if (data.description !== undefined) payload.descricao = data.description;
  if (data.price !== undefined) payload.valor = data.price;
  if (data.categoryId !== undefined) payload.id_categoria = data.categoryId;
  if (data.active !== undefined) payload.ativo = data.active ? 1 : 0;

  // Validar payload
  const validatedPayload = updateProductApiSchema.safeParse(payload);
  
  if (!validatedPayload.success) {
    console.error('Erro ao validar payload:', validatedPayload.error);
    throw new Error('Dados inválidos para atualização de produto');
  }

  await apiRequest<unknown>(
    `/produto/${productId}`,
    {
      method: 'PUT',
      headers: getAuthHeader(token),
      body: JSON.stringify(validatedPayload.data),
    }
  );
}

/**
 * Deletar produto
 */
export async function deleteProduct(productId: number, token: string) {
  await apiRequest<void>(
    `/produto/${productId}`,
    {
      method: 'DELETE',
      headers: getAuthHeader(token),
    }
  );
}
