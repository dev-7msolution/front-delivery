# Exemplos de Uso

Este documento contém exemplos práticos de como usar as tecnologias configuradas neste projeto.

## 📝 Validação com Zod

### Exemplo 1: Validação Básica

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
});

const user = {
  name: "João Silva",
  email: "joao@example.com",
  age: 25
};

const result = UserSchema.safeParse(user);
if (result.success) {
  console.log("Usuário válido:", result.data);
} else {
  console.error("Erros:", result.error.errors);
}
```

### Exemplo 2: Validação de Formulário

Veja o componente `ExampleForm.tsx` para um exemplo completo de validação de formulário com React e Zod.

### Exemplo 3: Validação em API Route

```typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = CreateUserSchema.parse(body);
    
    // Processar dados validados
    return NextResponse.json({ success: true, data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
```

## 🎨 Estilização com Tailwind CSS

### Exemplo 1: Classes Utilitárias

```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">
      Título
    </h1>
    <p className="text-gray-600">
      Conteúdo
    </p>
  </div>
</div>
```

### Exemplo 2: Responsividade

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 coluna em mobile, 2 em tablet, 3 em desktop */}
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Exemplo 3: Dark Mode

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Conteúdo que se adapta ao modo escuro
</div>
```

## 🔧 TypeScript

### Exemplo 1: Tipos Customizados

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

interface CartItem extends Product {
  quantity: number;
}
```

### Exemplo 2: Generics

```typescript
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirstItem([1, 2, 3]); // number | undefined
const firstString = getFirstItem(['a', 'b', 'c']); // string | undefined
```

### Exemplo 3: Utility Types

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Omit - remove propriedades
type PublicUser = Omit<User, 'password'>;

// Pick - seleciona propriedades
type UserCredentials = Pick<User, 'email' | 'password'>;

// Partial - torna todas as propriedades opcionais
type UpdateUser = Partial<User>;
```

## 🚀 Next.js App Router

### Exemplo 1: Server Component (Padrão)

```tsx
// src/app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Exemplo 2: Client Component

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  );
}
```

### Exemplo 3: Loading State

```tsx
// src/app/products/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}
```

### Exemplo 4: Error Handling

```tsx
// src/app/products/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-8">
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Algo deu errado!
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Tentar novamente
      </button>
    </div>
  );
}
```

## 🔗 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)
