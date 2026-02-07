# Estrutura do Projeto

Este documento explica a estrutura de diretórios e arquivos do projeto.

## 📁 Estrutura de Diretórios

```
LojaWeb/
├── src/
│   ├── app/                  # App Router do Next.js
│   │   ├── api/             # API Routes
│   │   │   └── hello/       # Exemplo de API endpoint
│   │   ├── layout.tsx       # Layout raiz da aplicação
│   │   ├── page.tsx         # Página inicial (/)
│   │   └── globals.css      # Estilos globais + Tailwind
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Button.tsx       # Componente de botão
│   │   ├── Card.tsx         # Componente de card
│   │   └── ExampleForm.tsx  # Exemplo de formulário com Zod
│   └── lib/                 # Utilitários e bibliotecas
│       ├── validations.ts   # Schemas de validação Zod
│       └── utils.ts         # Funções utilitárias
├── docs/                    # Documentação
│   ├── EXAMPLES.md         # Exemplos de uso
│   └── PROJECT_STRUCTURE.md # Este arquivo
├── node_modules/           # Dependências (não versionado)
├── .next/                  # Build do Next.js (não versionado)
├── .eslintrc.json         # Configuração do ESLint
├── .gitignore             # Arquivos ignorados pelo Git
├── .prettierrc.json       # Configuração do Prettier
├── .prettierignore        # Arquivos ignorados pelo Prettier
├── next.config.ts         # Configuração do Next.js
├── package.json           # Dependências e scripts
├── postcss.config.mjs     # Configuração do PostCSS
├── README.md              # Documentação principal
├── tailwind.config.ts     # Configuração do Tailwind CSS
├── tsconfig.json          # Configuração do TypeScript
└── yarn.lock              # Lock file do Yarn
```

## 📄 Arquivos Importantes

### Configuração

- **`package.json`**: Define as dependências e scripts do projeto
- **`tsconfig.json`**: Configuração do TypeScript (strict mode habilitado)
- **`tailwind.config.ts`**: Configuração do Tailwind CSS (temas, cores, etc)
- **`next.config.ts`**: Configuração do Next.js
- **`.eslintrc.json`**: Regras de linting para manter código consistente
- **`.prettierrc.json`**: Regras de formatação de código

### Código Fonte

- **`src/app/layout.tsx`**: Layout principal que envolve todas as páginas
- **`src/app/page.tsx`**: Página inicial da aplicação
- **`src/app/globals.css`**: Estilos globais e importação do Tailwind
- **`src/lib/validations.ts`**: Schemas de validação centralizados
- **`src/lib/utils.ts`**: Funções utilitárias compartilhadas

## 🎯 Convenções

### Nomenclatura

- **Componentes**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Utilitários**: camelCase (`formatCurrency`, `validateEmail`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- **Arquivos de configuração**: kebab-case ou padrão do framework

### Organização de Componentes

```tsx
// 1. Imports
import { useState } from 'react';
import Button from '@/components/Button';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component
export default function Component({ title }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### Validação com Zod

Centralize schemas de validação em `src/lib/validations.ts`:

```typescript
// src/lib/validations.ts
export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
```

Use nos componentes:

```typescript
import { userSchema } from '@/lib/validations';

const result = userSchema.safeParse(data);
```

### Componentes de UI

Crie componentes reutilizáveis em `src/components/`:

- Mantenha componentes pequenos e focados
- Use TypeScript para props
- Documente props complexas com JSDoc

### API Routes

Organize em `src/app/api/`:

```
src/app/api/
├── users/
│   └── route.ts          # GET/POST /api/users
├── users/[id]/
│   └── route.ts          # GET/PUT/DELETE /api/users/:id
└── hello/
    └── route.ts          # GET/POST /api/hello
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev          # Inicia servidor de desenvolvimento

# Produção
yarn build        # Cria build otimizada
yarn start        # Executa build de produção

# Qualidade de código
yarn lint         # Executa ESLint
```

## 📚 Próximos Passos

1. **Adicionar testes**: Configure Jest e React Testing Library
2. **State Management**: Adicione Zustand ou Context API conforme necessário
3. **Banco de Dados**: Configure Prisma ou Drizzle ORM
4. **Autenticação**: Adicione NextAuth.js
5. **Estilização avançada**: Configure shadcn/ui para componentes prontos

## 🔗 Recursos

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Zod Documentation](https://zod.dev/)
