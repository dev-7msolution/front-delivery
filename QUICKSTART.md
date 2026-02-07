# 🚀 Início Rápido

Guia rápido para começar a desenvolver com LojaWeb.

## 📦 Instalação Inicial

O projeto já está configurado! As dependências já foram instaladas.

Se precisar reinstalar:

```bash
yarn install
# ou
npm install
```

## 🏃 Executando o Projeto

### Modo de Desenvolvimento

```bash
yarn dev
# ou
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Build de Produção

```bash
# Criar build
yarn build

# Executar build
yarn start
```

## 📝 Primeiro Componente com shadcn/ui

Crie um novo componente usando shadcn/ui em `src/components/`:

```tsx
// src/components/Welcome.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  name: string;
}

export default function Welcome({ name }: WelcomeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bem-vindo, {name}! 👋</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Comece a construir seu aplicativo incrível!
        </p>
        <Button>Começar</Button>
      </CardContent>
    </Card>
  );
}
```

Use no `src/app/page.tsx`:

```tsx
import Welcome from '@/components/Welcome';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <Welcome name="Desenvolvedor" />
    </div>
  );
}
```

## 🎨 Usando Componentes shadcn/ui

### Botões

```tsx
import { Button } from '@/components/ui/button';

<Button>Default</Button>
<Button variant="destructive">Deletar</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Pequeno</Button>
<Button size="lg">Grande</Button>
```

### Cards

```tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Meu Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo aqui</p>
  </CardContent>
</Card>
```

### Formulários

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input type="email" id="email" placeholder="seu@email.com" />
  </div>
  <Button className="w-full">Enviar</Button>
</div>
```

## ✅ Validação com Zod

```tsx
'use client';

import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export default function MyForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    const result = schema.safeParse(data);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    console.log('Dados válidos:', result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        name="name" 
        placeholder="Nome"
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      
      <input 
        name="email" 
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Enviar
      </button>
    </form>
  );
}
```

## 🛣️ Criando Novas Páginas

### Página Simples

Crie `src/app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Sobre</h1>
      <p>Informações sobre o projeto...</p>
    </div>
  );
}
```

Acesse: [http://localhost:3000/about](http://localhost:3000/about)

### Página Dinâmica

Crie `src/app/products/[id]/page.tsx`:

```tsx
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <div className="p-8">
      <h1>Produto #{id}</h1>
    </div>
  );
}
```

Acesse: [http://localhost:3000/products/123](http://localhost:3000/products/123)

## 🔌 Criando API Routes

Crie `src/app/api/users/route.ts`:

```tsx
import { NextResponse } from 'next/server';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

// GET /api/users
export async function GET() {
  const users = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' },
  ];
  
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = userSchema.parse(body);
    
    // Processar dados...
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

Teste: [http://localhost:3000/api/users](http://localhost:3000/api/users)

## 📚 Recursos

- 📖 [Documentação Completa](./README.md)
- 💡 [Exemplos de Código](./docs/EXAMPLES.md)
- 🏗️ [Estrutura do Projeto](./docs/PROJECT_STRUCTURE.md)
- 🎨 [Guia shadcn/ui](./docs/SHADCN_GUIDE.md)

## 🆘 Problemas Comuns

### Porta 3000 em uso

```bash
# Usar porta diferente
yarn dev -p 3001
```

### Cache do Next.js

```bash
# Limpar cache
rm -rf .next
yarn dev
```

### Erros de tipo

```bash
# Verificar tipos
yarn tsc --noEmit
```

## ✨ Próximos Passos

1. ✅ Explore a página inicial em [http://localhost:3000](http://localhost:3000)
2. ✅ Teste o formulário de exemplo com validação Zod e shadcn/ui
3. ✅ Teste a API em [http://localhost:3000/api/hello](http://localhost:3000/api/hello)
4. 🎨 Explore os componentes shadcn/ui disponíveis
5. 📝 Crie sua primeira página customizada
6. 🔌 Crie suas próprias API routes
7. 🌙 Implemente um toggle de dark mode

## 🎨 Adicionando Mais Componentes shadcn/ui

Para adicionar mais componentes do shadcn/ui:

1. Visite [ui.shadcn.com](https://ui.shadcn.com)
2. Escolha o componente desejado
3. Copie o código para `src/components/ui/`
4. Instale dependências adicionais se necessário

Ou use o CLI (se disponível):

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add select
```

Componentes populares para adicionar:
- Dialog (modais)
- Dropdown Menu
- Select
- Checkbox
- Switch
- Toast (notificações)
- Tabs
- Alert

Veja o [Guia completo shadcn/ui](./docs/SHADCN_GUIDE.md) para mais detalhes.

Bom desenvolvimento! 🚀
