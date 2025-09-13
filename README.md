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
│   └── button/         # Button components
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

This section documents the contributions made by each team member during the development of the project.

### Federico

- **Figma Design**: Created the complete visual design and mockups for the application
- **Tailwind Implementation**: Set up Tailwind CSS design structure including custom variables and configuration
- **Global State Management**: Implemented global state management for chat status using Zustand
- **Backend Integration**: Developed the logic for API calls and communication with the backend services

### Emy

- **Chatbot UI Components** (Built the complete chatbot user interface including):
- Input component for user messages
- Message display components
- Loading animations and states
- Chat wrapper and layout components
- **Session Storage Logic**: Implemented session storage functionality for maintaining chat history and user state.

### Donato

- **Music Flow Management**: Developed the complete music system and audio management for the application
- **Landing Page**: Created the UI structure and components for the landing page

### Virginia

- **Core Components** (Developed essential reusable components for the application including):
- Button component with consistent styling
