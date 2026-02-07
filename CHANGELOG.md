# Changelog

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

## [0.2.0] - 2026-01-27

### ✨ Adicionado

#### shadcn/ui Integration
- Configuração completa do shadcn/ui
- Adição de componentes UI básicos:
  - Button (com múltiplas variantes e tamanhos)
  - Card (com Header, Content, Footer, etc)
  - Input (campo de entrada estilizado)
  - Label (rótulos de formulário)
  - Textarea (área de texto)
- Configuração de tema com CSS variables
- Suporte completo a dark mode
- Integração com Radix UI para acessibilidade

#### Dependências
- `@radix-ui/react-label@^2.1.8`
- `@radix-ui/react-slot@^1.2.4`
- `class-variance-authority@^0.7.1`
- `tailwind-merge@^3.4.0`
- `tailwindcss-animate@^1.0.7`
- `lucide-react@^0.563.0` (biblioteca de ícones)

#### Arquivos de Configuração
- `components.json` - Configuração do shadcn/ui
- Atualização do `tailwind.config.ts` com tema shadcn/ui
- Atualização do `src/app/globals.css` com CSS variables

#### Documentação
- `docs/SHADCN_GUIDE.md` - Guia completo de uso do shadcn/ui
- `docs/ADD_COMPONENTS.md` - Instruções para adicionar mais componentes
- Atualização do README.md com informações do shadcn/ui
- Atualização do QUICKSTART.md com exemplos shadcn/ui

#### Exemplos
- `src/components/IconExample.tsx` - Exemplos de uso de ícones lucide-react
- Atualização do ExampleForm com componentes shadcn/ui
- Atualização da página inicial com design moderno usando shadcn/ui

### 🔄 Modificado

- Função `cn` em `src/lib/utils.ts` agora usa `tailwind-merge`
- Formulário de exemplo redesenhado com componentes shadcn/ui
- Página inicial redesenhada com Cards e Buttons do shadcn/ui
- Tema de cores completamente refeito para usar sistema shadcn/ui

### 🎨 Design

- Interface moderna e limpa
- Melhor acessibilidade com Radix UI
- Animações suaves com tailwindcss-animate
- Suporte completo a dark mode
- Design responsivo em todos os componentes

## [0.1.0] - 2026-01-27

### ✨ Adicionado (Versão Inicial)

#### Stack Tecnológica
- Next.js 15 com App Router
- TypeScript 5.7
- Tailwind CSS 3.4
- Zod 3.24 para validação
- ESLint e Prettier para qualidade de código

#### Estrutura Base
- Configuração completa do TypeScript
- Configuração do Tailwind CSS
- Configuração do ESLint
- Estrutura de diretórios organizada

#### Componentes Iniciais
- `ExampleForm.tsx` - Formulário com validação Zod
- `Button.tsx` - Componente de botão básico
- `Card.tsx` - Componente de card básico

#### API
- `/api/hello` - Exemplo de API route com validação Zod

#### Validações
- `src/lib/validations.ts` - Schemas Zod para User, Product, ContactForm

#### Utilitários
- `src/lib/utils.ts` - Funções utilitárias (formatação, etc)

#### Documentação
- `README.md` - Documentação principal
- `QUICKSTART.md` - Guia de início rápido
- `docs/EXAMPLES.md` - Exemplos de código
- `docs/PROJECT_STRUCTURE.md` - Estrutura do projeto

#### Configurações
- `.vscode/settings.json` - Configurações do VS Code
- `.prettierrc.json` - Configuração do Prettier
- `.gitignore` - Arquivos ignorados pelo Git

---

## Formato

O formato deste changelog é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudanças

- **✨ Adicionado** - para novas funcionalidades
- **🔄 Modificado** - para mudanças em funcionalidades existentes
- **🗑️ Descontinuado** - para funcionalidades que serão removidas
- **❌ Removido** - para funcionalidades removidas
- **🐛 Corrigido** - para correção de bugs
- **🔒 Segurança** - em caso de vulnerabilidades
