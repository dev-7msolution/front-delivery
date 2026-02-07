import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.coerce.number({
    required_error: 'Preço é obrigatório',
    invalid_type_error: 'Preço deve ser um número',
  }).positive('Preço deve ser positivo'),
  categoryId: z.coerce.number({
    required_error: 'Categoria é obrigatória',
    invalid_type_error: 'Categoria deve ser um número',
  }).positive('Categoria é obrigatória'),
  image: z.string().optional().or(z.literal('')),
  active: z.coerce.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
