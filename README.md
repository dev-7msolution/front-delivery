# FoodApp 🍕

Aplicativo de delivery de comida com autenticação e interface moderna construída com Next.js, TypeScript, Tailwind CSS, shadcn/ui e Zod.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI acessíveis e personalizáveis
- **Zod** - Validação de esquemas TypeScript-first
- **Radix UI** - Primitivos UI sem estilo
- **Lucide React** - Biblioteca de ícones

## 🎨 Tema de Cores

O aplicativo usa um tema de **cores quentes** (laranja, vermelho, amarelo) para simbolizar a fome e criar uma experiência visual apetitosa:

- 🟠 **Primário:** Laranja vibrante (#FF6B00)
- 🔴 **Acento:** Vermelho quente (#EA4335)
- 🟡 **Secundário:** Amarelo suave (#FBBC04)

## 🔐 Autenticação

O app se integra com a API de fidelidade para autenticação:

**API Base URL:** `https://api-fidelidade.7msolution.com.br`

**Credenciais de teste:**
- Email: `rafa@teste.com.br`
- Senha: (fornecida pela API)

Veja [docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md) para detalhes completos.

## 📦 Instalação

```bash
yarn install
```

## 🛠️ Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Páginas Disponíveis

- `/` - Landing page
- `/login` - Página de autenticação
- `/dashboard` - Dashboard (protegido, requer login)

## 🏗️ Build

Para criar uma build de produção:

Com npm:
```bash
npm run build
```

Com yarn:
```bash
yarn build
```

Para executar a build de produção:

Com npm:
```bash
npm start
```

Com yarn:
```bash
yarn start
```

## 📝 Estrutura do Projeto

```
FoodApp/
├── src/
│   ├── app/
│   │   ├── api/                # API Routes
│   │   ├── dashboard/          # Dashboard (protegido)
│   │   ├── login/              # Página de login
│   │   ├── layout.tsx          # Layout com AuthProvider
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Tema de cores quentes
│   ├── components/
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   ├── ProtectedRoute.tsx  # HOC para rotas protegidas
│   │   └── ...                 # Outros componentes
│   ├── contexts/
│   │   └── AuthContext.tsx     # Context de autenticação
│   ├── lib/
│   │   ├── api/                # Cliente e funções de API
│   │   ├── validations/        # Schemas Zod
│   │   └── utils.ts            # Funções utilitárias
│   └── types/
│       └── auth.ts             # Tipos TypeScript
├── docs/                       # Documentação
│   └── API_INTEGRATION.md      # Guia de integração com API
├── components.json             # Configuração shadcn/ui
├── tailwind.config.ts          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
└── next.config.ts              # Configuração do Next.js
```

## 🎨 Uso do Zod

Exemplo de validação com Zod:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18),
});

type User = z.infer<typeof UserSchema>;
```

## 🎨 Componentes shadcn/ui

Este projeto inclui os seguintes componentes shadcn/ui:

- ✅ Button - Botões com múltiplas variantes
- ✅ Card - Cards para organização de conteúdo
- ✅ Input - Campos de entrada
- ✅ Label - Rótulos de formulário
- ✅ Textarea - Área de texto

Para adicionar mais componentes, visite [ui.shadcn.com](https://ui.shadcn.com) ou leia o [Guia shadcn/ui](./docs/SHADCN_GUIDE.md).

## ✨ Funcionalidades

- ✅ Autenticação com JWT
- ✅ Proteção de rotas
- ✅ Validação de formulários com Zod
- ✅ Tema de cores quentes (laranja/vermelho/amarelo)
- ✅ Interface responsiva com shadcn/ui
- ✅ Dark mode
- ✅ TypeScript para type-safety
- ✅ Context API para gerenciamento de estado

## 📚 Recursos

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do shadcn/ui](https://ui.shadcn.com)
- [Documentação do Zod](https://zod.dev/)
- [Guia shadcn/ui do Projeto](./docs/SHADCN_GUIDE.md)
- [Integração com API](./docs/API_INTEGRATION.md)

## 📄 Licença

Este projeto é de uso livre.
