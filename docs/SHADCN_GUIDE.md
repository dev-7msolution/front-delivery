# Guia shadcn/ui

Este projeto está configurado com **shadcn/ui**, uma coleção de componentes reutilizáveis e acessíveis construídos com Radix UI e Tailwind CSS.

## 📦 Componentes Instalados

Os seguintes componentes já estão disponíveis em `src/components/ui/`:

- ✅ **Button** - Botões com múltiplas variantes
- ✅ **Card** - Cards para conteúdo organizado
- ✅ **Input** - Campos de entrada de texto
- ✅ **Label** - Rótulos para formulários
- ✅ **Textarea** - Área de texto multilinha

## 🎨 Usando os Componentes

### Button

```tsx
import { Button } from "@/components/ui/button";

// Variantes disponíveis
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamanhos disponíveis
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <IconComponent />
</Button>
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo principal do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

### Input & Label

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    type="email" 
    id="email" 
    placeholder="seu@email.com" 
  />
</div>
```

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea 
  placeholder="Digite sua mensagem..." 
  rows={4}
/>
```

## 🎯 Exemplo Completo: Formulário

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyForm() {
  const [email, setEmail] = useState('');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Customização de Cores

As cores do tema são definidas em `src/app/globals.css` usando CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... mais cores */
}
```

Para mudar o esquema de cores, edite esses valores HSL.

## 🌙 Dark Mode

O dark mode está configurado e funcionando. Para alternar entre temas:

```tsx
<html lang="pt-BR" className="dark">
  {/* Seu conteúdo */}
</html>
```

Ou use um componente de toggle:

```tsx
'use client';

export function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme}>
      Alternar Tema
    </button>
  );
}
```

## 📚 Adicionando Mais Componentes

### Opção 1: Criar Manualmente

Visite [ui.shadcn.com](https://ui.shadcn.com) e copie o código do componente desejado para `src/components/ui/`.

### Opção 2: Usar o CLI (recomendado se funcionar)

```bash
# Adicionar um componente específico
npx shadcn@latest add dialog

# Adicionar múltiplos componentes
npx shadcn@latest add dialog alert dropdown-menu
```

## 🔧 Componentes Úteis para Adicionar

Alguns componentes populares que você pode querer adicionar:

- **Dialog** - Modais e diálogos
- **Dropdown Menu** - Menus suspensos
- **Select** - Seleção de opções
- **Checkbox** - Caixas de seleção
- **Radio Group** - Grupos de rádio
- **Switch** - Interruptores
- **Toast** - Notificações
- **Tabs** - Abas
- **Alert** - Alertas e avisos
- **Badge** - Badges e etiquetas
- **Avatar** - Avatares de usuário
- **Progress** - Barras de progresso
- **Skeleton** - Loading placeholders
- **Table** - Tabelas de dados

## 🎯 Padrões e Melhores Práticas

### 1. Use a função `cn` para mesclar classes

```tsx
import { cn } from "@/lib/utils";

<Button className={cn("custom-class", isActive && "active-class")}>
  Meu Botão
</Button>
```

### 2. Combine com Zod para validação

```tsx
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email(),
});

// Use em seus formulários
```

### 3. Crie variações personalizadas

```tsx
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

<Link 
  href="/about"
  className={buttonVariants({ variant: "outline" })}
>
  Sobre
</Link>
```

### 4. Componha componentes

```tsx
<Card>
  <CardHeader>
    <CardTitle>Usuários</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    {users.map(user => (
      <div key={user.id} className="flex items-center gap-2">
        <Avatar />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="ghost" size="sm" className="ml-auto">
          Editar
        </Button>
      </div>
    ))}
  </CardContent>
</Card>
```

## 🎨 Ícones com lucide-react

O lucide-react já está instalado e funciona perfeitamente com shadcn/ui:

```tsx
import { Check, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

<Button>
  <Check className="mr-2 h-4 w-4" />
  Salvar
</Button>

<Button variant="destructive">
  <X className="mr-2 h-4 w-4" />
  Cancelar
</Button>

<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Carregando...
</Button>
```

## 📖 Recursos

- 🌐 [Documentação shadcn/ui](https://ui.shadcn.com)
- 🎨 [Radix UI](https://www.radix-ui.com/)
- 🎯 [Tailwind CSS](https://tailwindcss.com/)
- 🎭 [CVA (Class Variance Authority)](https://cva.style/)
- 🔍 [lucide-react Icons](https://lucide.dev/)

## 💡 Dicas

1. **Explore todos os componentes** no site oficial do shadcn/ui
2. **Customize as cores** editando as CSS variables
3. **Combine com Zod** para validação type-safe
4. **Use o dark mode** para melhor experiência do usuário
5. **Aproveite os ícones** do lucide-react para UI rica
6. **Componha componentes** para criar interfaces complexas

## 🚀 Próximos Passos

1. ✅ Explore a página inicial do projeto
2. ✅ Teste o formulário de exemplo
3. 📦 Adicione mais componentes conforme necessário
4. 🎨 Customize o tema de cores
5. 🌙 Implemente um toggle de dark mode
6. 💡 Crie seus próprios componentes customizados

Bom desenvolvimento! 🎨
