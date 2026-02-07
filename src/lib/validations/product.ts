import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().positive('Preço deve ser positivo'),
  categoryId: z.number().positive('Categoria é obrigatória'),
  image: z.string().url('URL inválida').optional().or(z.literal('')),
  active: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;
