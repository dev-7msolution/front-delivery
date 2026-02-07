import { z } from 'zod';

// Exemplo de validação de usuário
export const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade mínima é 18 anos'),
});

export type User = z.infer<typeof userSchema>;

// Exemplo de validação de produto
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  category: z.enum(['electronics', 'clothing', 'food', 'books', 'other']),
});

export type Product = z.infer<typeof productSchema>;

// Exemplo de validação de formulário de contato
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
