# Frontend - Pet Impacta

Frontend do sistema Pet Impacta desenvolvido com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes
- **ESLint** - Linting de código
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── layout/           # Componentes de layout
│   └── forms/            # Componentes de formulário
├── hooks/                # Custom hooks
├── lib/                  # Utilitários e configurações
├── types/                # Definições de tipos TypeScript
└── utils/                # Funções utilitárias
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```

## 🎨 Componentes shadcn/ui

O projeto já inclui os seguintes componentes:

- `Button` - Botões com variantes
- `Card` - Cards para conteúdo
- `Input` - Campos de entrada
- `Label` - Labels para formulários

Para adicionar mais componentes:

```bash
npx shadcn@latest add [component-name]
```

## 🌙 Modo Escuro

O projeto suporta modo escuro nativamente através do Tailwind CSS. Use as classes `dark:` para estilos específicos do modo escuro.

## 📱 Responsividade

Todos os componentes são responsivos usando as classes do Tailwind CSS:

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### Configuração do shadcn/ui

O arquivo `components.json` contém as configurações do shadcn/ui. Para personalizar:

```bash
npx shadcn@latest init
```

## 🚀 Deploy

O projeto está configurado para deploy em plataformas como Vercel, Netlify ou qualquer provedor que suporte Next.js.

## 📚 Documentação

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
