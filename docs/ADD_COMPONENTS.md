# Como Adicionar Mais Componentes shadcn/ui

Este guia mostra como adicionar novos componentes shadcn/ui ao projeto.

## 🎯 Método Recomendado: Manual

Como o CLI pode ter problemas com permissões, recomendamos adicionar componentes manualmente:

### Passo 1: Visite o site do shadcn/ui

Acesse [ui.shadcn.com](https://ui.shadcn.com) e navegue até o componente desejado.

### Passo 2: Instale as dependências necessárias

Verifique quais dependências o componente precisa e instale com:

```bash
yarn add [dependências]
```

### Passo 3: Copie o código do componente

Copie o código do componente e crie o arquivo em `src/components/ui/`.

## 📦 Componentes Populares e Suas Dependências

### Dialog

```bash
yarn add @radix-ui/react-dialog
```

Crie `src/components/ui/dialog.tsx` e copie o código de [ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog)

### Dropdown Menu

```bash
yarn add @radix-ui/react-dropdown-menu
```

Crie `src/components/ui/dropdown-menu.tsx`

### Select

```bash
yarn add @radix-ui/react-select
```

Crie `src/components/ui/select.tsx`

### Checkbox

```bash
yarn add @radix-ui/react-checkbox
```

Crie `src/components/ui/checkbox.tsx`

### Switch

```bash
yarn add @radix-ui/react-switch
```

Crie `src/components/ui/switch.tsx`

### Toast

```bash
yarn add @radix-ui/react-toast
```

Crie `src/components/ui/toast.tsx` e `src/components/ui/toaster.tsx`

### Tabs

```bash
yarn add @radix-ui/react-tabs
```

Crie `src/components/ui/tabs.tsx`

### Alert Dialog

```bash
yarn add @radix-ui/react-alert-dialog
```

Crie `src/components/ui/alert-dialog.tsx`

### Accordion

```bash
yarn add @radix-ui/react-accordion
```

Crie `src/components/ui/accordion.tsx`

### Avatar

```bash
yarn add @radix-ui/react-avatar
```

Crie `src/components/ui/avatar.tsx`

### Badge

Não requer dependências adicionais. Crie `src/components/ui/badge.tsx`

### Progress

```bash
yarn add @radix-ui/react-progress
```

Crie `src/components/ui/progress.tsx`

### Skeleton

Não requer dependências adicionais. Crie `src/components/ui/skeleton.tsx`

### Separator

```bash
yarn add @radix-ui/react-separator
```

Crie `src/components/ui/separator.tsx`

### Popover

```bash
yarn add @radix-ui/react-popover
```

Crie `src/components/ui/popover.tsx`

### Radio Group

```bash
yarn add @radix-ui/react-radio-group
```

Crie `src/components/ui/radio-group.tsx`

### Slider

```bash
yarn add @radix-ui/react-slider
```

Crie `src/components/ui/slider.tsx`

### Table

Não requer dependências adicionais. Crie `src/components/ui/table.tsx`

## 🔄 Alternativa: Usar o CLI (se disponível)

Se você tiver permissões adequadas, pode usar o CLI:

```bash
# Adicionar um componente
npx shadcn@latest add dialog

# Adicionar múltiplos componentes
npx shadcn@latest add dialog dropdown-menu select

# Ver todos os componentes disponíveis
npx shadcn@latest add
```

## 💡 Exemplo Completo: Adicionando Dialog

### 1. Instalar dependência

```bash
yarn add @radix-ui/react-dialog
```

### 2. Criar o arquivo

Crie `src/components/ui/dialog.tsx` com o seguinte conteúdo (copie de [ui.shadcn.com](https://ui.shadcn.com)):

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// ... resto do código do componente
```

### 3. Usar o componente

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Título do Dialog</DialogTitle>
          <DialogDescription>
            Descrição do dialog aqui.
          </DialogDescription>
        </DialogHeader>
        {/* Conteúdo */}
      </DialogContent>
    </Dialog>
  );
}
```

## 🎨 Dicas

1. **Sempre verifique as dependências** antes de adicionar um componente
2. **Leia a documentação** do componente no site do shadcn/ui
3. **Teste o componente** depois de adicionar
4. **Customize conforme necessário** - os componentes são seus!
5. **Mantenha consistência** com o resto do projeto

## 🔗 Recursos

- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Guia shadcn/ui do Projeto](./SHADCN_GUIDE.md)

## 📊 Componentes Mais Úteis

Para a maioria dos projetos, recomendamos começar com:

1. ✅ Dialog - Já temos Button, Card, Input, Label, Textarea
2. 📋 Dropdown Menu - Para menus de ações
3. 📝 Select - Para seleção de opções
4. ✓ Checkbox - Para checkboxes
5. 🔔 Toast - Para notificações
6. 📑 Tabs - Para organização de conteúdo
7. ⚠️ Alert Dialog - Para confirmações
8. 👤 Avatar - Para perfis de usuário
9. 🏷️ Badge - Para etiquetas e status
10. 📊 Progress - Para barras de progresso

Bom desenvolvimento! 🚀
