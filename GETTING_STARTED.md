# 🚀 Começando com o FoodApp

Guia rápido para começar a usar o aplicativo.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Yarn ou npm
- Acesso à API: `https://api-fidelidade.7msolution.com.br`

## 🏃 Início Rápido

### 1. Instalar Dependências

```bash
yarn install
```

### 2. Iniciar o Servidor

```bash
yarn dev
```

### 3. Acessar o Aplicativo

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔐 Fazer Login

1. Acesse [http://localhost:3000/login](http://localhost:3000/login)
2. Use as credenciais de teste:
   - **Email:** `rafa@teste.com.br`
   - **Senha:** (fornecida pela API)
3. Clique em "Entrar"
4. Você será redirecionado para o dashboard

## 🎯 Fluxo do Usuário

```
Landing Page (/) 
    ↓
Login (/login)
    ↓
Dashboard (/dashboard) [Protegido]
```

## 📱 Páginas Disponíveis

### Landing Page (`/`)

- Página inicial com apresentação do app
- Botões para fazer pedido ou entrar
- Redirecionamento automático se já estiver logado

### Login (`/login`)

- Formulário de autenticação
- Validação em tempo real com Zod
- Mensagens de erro claras
- Loading state durante autenticação
- Redirecionamento automático após login

### Dashboard (`/dashboard`)

- Página protegida (requer autenticação)
- Mostra informações do usuário
- Categorias de comida
- Produtos em destaque
- Botão de logout

## 🎨 Tema de Cores

O app usa cores quentes para simbolizar fome:

- **Laranja:** `#FF6B00` (cor primária)
- **Vermelho:** `#EA4335` (acento)
- **Amarelo:** `#FBBC04` (secundário)

## 🔧 Estrutura de Autenticação

### Context API

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  
  // user: dados do usuário logado
  // token: JWT token
  // login(): função para fazer login
  // logout(): função para fazer logout
  // isAuthenticated: boolean
}
```

### Proteger Rotas

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      {/* Conteúdo protegido */}
    </ProtectedRoute>
  );
}
```

## 📝 Validação de Formulários

O app usa Zod para validação type-safe:

```typescript
import { loginSchema } from '@/lib/validations/auth';

// Validar dados
const result = loginSchema.safeParse(formData);

if (result.success) {
  // Dados válidos
  console.log(result.data);
} else {
  // Mostrar erros
  console.log(result.error.errors);
}
```

## 🎨 Componentes shadcn/ui

Componentes disponíveis:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Usar nos seus componentes
<Button>Clique Aqui</Button>
<Card>...</Card>
<Input type="email" />
```

## 🔌 Fazer Requisições à API

### Usando o Cliente API

```typescript
import { apiRequest, getAuthHeader } from '@/lib/api/client';

// Requisição simples
const data = await apiRequest('/endpoint');

// Com autenticação
const token = localStorage.getItem('auth_token');
const data = await apiRequest('/protected', {
  headers: getAuthHeader(token),
});
```

### Adicionar Novos Endpoints

1. Criar tipos em `src/types/`
2. Criar schemas Zod em `src/lib/validations/`
3. Criar função de API em `src/lib/api/`
4. Usar nos componentes

## 🐛 Debug

### Verificar Token

```javascript
// No console do navegador
localStorage.getItem('auth_token')
```

### Verificar Usuário

```javascript
JSON.parse(localStorage.getItem('auth_user'))
```

### Limpar Autenticação

```javascript
localStorage.removeItem('auth_token')
localStorage.removeItem('auth_user')
```

## 📚 Comandos Úteis

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Executar build
yarn start

# Linting
yarn lint

# Limpar cache do Next.js
rm -rf .next
```

## 🎯 Próximos Passos

1. ✅ Explorar o dashboard
2. 📝 Adicionar mais páginas
3. 🛒 Implementar carrinho de compras
4. 💳 Adicionar checkout
5. 📦 Integrar com mais endpoints da API
6. 🎨 Customizar tema de cores
7. 📱 Adicionar mais componentes shadcn/ui

## 🆘 Problemas Comuns

### Erro de CORS

Se encontrar erros de CORS, verifique se a API permite requisições do seu domínio.

### Token Expirado

Se o token expirar, faça logout e login novamente.

### Porta em Uso

```bash
# Usar porta diferente
yarn dev -p 3001
```

## 📖 Documentação Adicional

- [README.md](./README.md) - Visão geral
- [docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md) - Integração com API
- [docs/SHADCN_GUIDE.md](./docs/SHADCN_GUIDE.md) - Guia shadcn/ui
- [QUICKSTART.md](./QUICKSTART.md) - Início rápido

## 💡 Dicas

1. **Use TypeScript** - Aproveite a tipagem estática
2. **Valide com Zod** - Sempre valide dados de entrada
3. **Proteja rotas** - Use `ProtectedRoute` para páginas privadas
4. **Reutilize componentes** - Use componentes shadcn/ui
5. **Mantenha consistência** - Siga os padrões do projeto

Bom desenvolvimento! 🚀🍕
