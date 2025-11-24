# Nuel Prototype

A modern, full-featured Next.js application built with TypeScript, Tailwind CSS, and a comprehensive set of production-ready tools for state management, forms, animations, and UI components.

## Tech Stack

### Core Framework
- **[Next.js 14.2.33](https://nextjs.org/)** - React framework with App Router
- **[React 18.3.1](https://react.dev/)** - UI library
- **[TypeScript 5.5.4](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 3.4.7](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[PostCSS 8.4.40](https://postcss.org/)** - CSS transformations
- **[Autoprefixer 10.4.19](https://github.com/postcss/autoprefixer)** - Browser compatibility

### State Management & Forms
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library

### Code Quality & Formatting
- **[ESLint 8.57.1](https://eslint.org/)** - JavaScript/TypeScript linter
- **[eslint-config-next 14.2.5](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** - Next.js ESLint configuration
- **[Prettier 3.3.3](https://prettier.io/)** - Code formatter
- **[prettier-plugin-tailwindcss 0.6.5](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)** - Automatic Tailwind class sorting
- **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** - Disable ESLint rules that conflict with Prettier

### TypeScript Type Definitions
- **[@types/node 20.14.12](https://www.npmjs.com/package/@types/node)** - Node.js type definitions
- **[@types/react 18.3.3](https://www.npmjs.com/package/@types/react)** - React type definitions
- **[@types/react-dom 18.3.0](https://www.npmjs.com/package/@types/react-dom)** - React DOM type definitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
/
├── app/                    # App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles with Tailwind directives
├── components/            # Reusable React components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions and helpers
│   └── utils.ts           # Utility functions (including cn for Tailwind)
├── public/                # Static assets (images, fonts, etc.)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── next.config.js         # Next.js configuration
├── components.json        # shadcn/ui configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
└── .gitignore             # Git ignore rules
```

## Development

### Key Features

This project comes with a comprehensive development setup:

- **Modern Next.js 14** with App Router for file-based routing
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid UI development
- **shadcn/ui** for beautiful, accessible components
- **Zustand** for simple and scalable state management
- **React Hook Form + Zod** for type-safe form validation
- **Framer Motion** for smooth animations
- **Lucide React** for consistent iconography
- **Recharts** for data visualization
- **ESLint + Prettier** for code quality and consistency

### Adding shadcn/ui Components

To add new components from shadcn/ui:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# ... and more
```

### State Management with Zustand

Create stores in the `lib/` directory:

```typescript
import { create } from 'zustand'

interface StoreState {
  count: number
  increment: () => void
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))
```

### Form Validation with React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
})
```

## Production Readiness

This project is configured for production with:

- ✅ TypeScript strict mode enabled
- ✅ React strict mode enabled
- ✅ ESLint with Next.js best practices
- ✅ Prettier for consistent formatting
- ✅ Image optimization configured
- ✅ Zero vulnerabilities in dependencies
- ✅ Modern build tools and optimizations



