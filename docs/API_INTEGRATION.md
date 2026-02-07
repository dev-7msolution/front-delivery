# Integração com API

Este documento descreve como o FoodApp se integra com a API de backend.

## 🔗 Base URL

```
https://api-fidelidade.7msolution.com.br
```

## 🔐 Autenticação

### Login

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "rafa@teste.com.br",
  "password": "sua_senha"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "rafa@teste.com.br",
    "name": "RAFAEL VELOCE",
    "empresaId": 1,
    "role": 1
  }
}
```

**Validação com Zod:**

O projeto usa Zod para validar as respostas da API:

```typescript
import { loginResponseSchema } from '@/lib/validations/auth';

const response = await fetch('/login', { ... });
const data = await response.json();

// Valida e garante type-safety
const validatedData = loginResponseSchema.parse(data);
```

## 🔑 Autenticação de Requisições

Após o login, o token JWT é armazenado no `localStorage` e incluído automaticamente nas requisições:

```typescript
import { getAuthHeader } from '@/lib/api/client';

const token = localStorage.getItem('auth_token');
const headers = getAuthHeader(token);

fetch('/api/endpoint', {
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  }
});
```

## 📦 Estrutura de Arquivos

### Client API (`src/lib/api/client.ts`)

Funções utilitárias para fazer requisições:

- `apiRequest<T>()` - Wrapper para fetch com tratamento de erros
- `getAuthHeader()` - Retorna header de autorização
- `ApiError` - Classe customizada para erros de API

### Auth API (`src/lib/api/auth.ts`)

Funções específicas de autenticação:

- `loginUser()` - Faz login e valida resposta
- `saveAuthData()` - Salva token e usuário no localStorage
- `getAuthData()` - Recupera dados do localStorage
- `clearAuthData()` - Limpa dados de autenticação

### Validações (`src/lib/validations/auth.ts`)

Schemas Zod para validação:

- `loginSchema` - Valida dados do formulário de login
- `userSchema` - Valida objeto de usuário
- `loginResponseSchema` - Valida resposta da API

## 🎯 Context de Autenticação

O `AuthContext` gerencia o estado de autenticação globalmente:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated, isLoading } = useAuth();

  // Usar conforme necessário
}
```

### Propriedades Disponíveis

- `user` - Objeto do usuário logado ou `null`
- `token` - Token JWT ou `null`
- `login(credentials)` - Função para fazer login
- `logout()` - Função para fazer logout
- `isAuthenticated` - Boolean indicando se está autenticado
- `isLoading` - Boolean indicando carregamento

## 🛡️ Proteção de Rotas

Use o componente `ProtectedRoute` para proteger páginas:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Conteúdo protegido</div>
    </ProtectedRoute>
  );
}
```

## 🔄 Fluxo de Autenticação

1. **Usuário acessa `/login`**
2. **Preenche credenciais** e submete formulário
3. **Validação client-side** com Zod
4. **Requisição para API** via `loginUser()`
5. **Validação da resposta** com Zod
6. **Armazenamento** do token e usuário
7. **Redirecionamento** para `/dashboard`
8. **Requisições subsequentes** incluem token no header

## 📝 Exemplo Completo

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/lib/validations/auth';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar com Zod
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      // Mostrar erros
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      // Fazer login
      await login(formData);
      // Redirecionamento automático
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
    </form>
  );
}
```

## 🚀 Próximas Integrações

Para adicionar mais endpoints da API:

1. **Criar tipos TypeScript** em `src/types/`
2. **Criar schemas Zod** em `src/lib/validations/`
3. **Criar funções de API** em `src/lib/api/`
4. **Usar nos componentes** com hooks ou diretamente

### Exemplo: Adicionar endpoint de produtos

```typescript
// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// src/lib/validations/product.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

// src/lib/api/products.ts
import { apiRequest, getAuthHeader } from './client';
import { productSchema } from '../validations/product';

export async function getProducts(token: string) {
  const response = await apiRequest('/products', {
    headers: getAuthHeader(token),
  });
  
  return z.array(productSchema).parse(response);
}
```

## 🔒 Segurança

- ✅ Token armazenado no `localStorage`
- ✅ Validação de dados com Zod
- ✅ Tratamento de erros apropriado
- ✅ Rotas protegidas com `ProtectedRoute`
- ✅ Redirecionamento automático se não autenticado

## 📚 Recursos

- [Documentação Zod](https://zod.dev/)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [JWT.io](https://jwt.io/)
