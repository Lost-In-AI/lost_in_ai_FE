# Lost in AI

Lost in AI simulates a phone customer service experience with the most frustrating elements: hold music, continuous transfers, and AI operators (via OpenAI) that never seem to understand the problem. All designed to be technically brilliant but deliberately useless, demonstrating skills in conversational AI, development, deploy and UX design.

 While all chatbots try to be helpful, ours must be memorably useless but in a sophisticated and entertaining way.

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router DOM v7** - Client-side routing
- **ESLint + Prettier + Husky** - Code quality, formatting and pre-commit hooks

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lost-In-AI/lost_in_ai_FE
```

2. Navigate to the project directory:
```bash
cd lost_in_ai_FE
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── button/         # Button components
│   └── example/        # Example components
├── hooks/              # Custom React hooks
├── pages/              # Page-level components
├── store/              # Zustand stores for global state
└── data/               # Mock data

types/                  # Global TypeScript definitions
```

## Development

This project uses:
- **Zustand** for global state management
- **Custom hooks** for reusable logic
- **Centralized routing**
- **TypeScript** with strict type checking

## Team Contributions

### Donato
- Installation of project dependencies (React, Zustand, Husky, Prettier, Tailwind)

### Emy
- Project issues organization and management
- Project scaffolding and folder structure creation with standards (components, utils, pages, types, usage examples)

### Federico
<!-- - Tailwind design structure implementation (custom variables and configuration) -->

### Virginia