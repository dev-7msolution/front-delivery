import { z } from 'zod';

export const categorySchema = z.object({
  nome_categoria: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  ativo: z.number().min(0).max(1).default(1),
  icon: z.string().default('Lucid'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const categoryApiSchema = z.object({
  id_categoria: z.number(),
  id_empresa: z.number(),
  nome_categoria: z.string(),
  ativo: z.number(),
  data_cadastrou: z.string(),
  data_update: z.string().nullable(),
  icon: z.string(),
});

export const categoryResponseSchema = z.object({
  status: z.boolean(),
  resultado: z.array(categoryApiSchema),
});
