# Lost in AI

Lost-In-AI is a front-end project that simulates bank customer service. The user interacts with Bankly, a deliberately frustrating and ineffective AI bot designed to poke fun at the often negative experience of banking call centers.

## System Objectives

- Simulate the experience of an inefficient banking customer service, with the bot intentionally giving nonsensical responses, satirizing real call centers.

- Manage sessions and persistent chat history.

- Provide a consistent and responsive user experience, with a simple and clear interface despite the bot’s frustrating behavior.

. Give users control: at any time they can interrupt the interaction with the chatbot, ensuring freedom in managing their own experience.

## General Architecture

The project is organized into two main parts:

- Frontend: developed with React, TypeScript, and Vite.

- Backend: an external service (API POST ${VITE_BE_BASE_URL}/chat) that handles the bot’s simulated responses.


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

## Main Stores

- **useChatStatusStore** → manages loading state: "idle" | "pending".
- **useSessionStore** → maintains sessionData { session_id, history } and the shouldAnimateLastMessage flag.


## Main Flows

**Chat Flow** 

1. The user enters a message.
2. The message is sent to POST /chat.
3. The backend replies with a simulated message.
4. The state is updated in useSessionStore and persisted in sessionStorage.
5. The UI displays the new message.

## Environment Variables

- VITE_BE_BASE_URL: Backend URL for API calls.

## Team Contributions

This section documents the contributions made by each team member during the development of the project.

### Federico

- **Figma Design**: Created the complete visual design and mockups for the application
- **Tailwind Implementation**: Set up Tailwind CSS design structure including custom variables and configuration
- **Global State Management**: Implemented global state management for chat status using Zustand
- **Backend Integration**: Developed the logic for API calls and communication with the backend services
- **Animation flow management**

### Emy

- **Chatbot UI Components** (Built the complete chatbot user interface including):
- Input component for user messages
- Message display components
- Loading animations and states
- Chat wrapper and layout components
- **Session Storage Logic**: Implemented session storage functionality for maintaining chat history and user state.

### Donato

- Development and implementation of the login page and initial project setup and configuration of the development environment
- **Music Flow Management**: Developed the complete music system and audio management for the application
- **Landing Page**: Created the UI structure and components for the landing page

### Virginia

- **Core Components** (Developed essential reusable components for the application including):
- Button component with consistent styling
- Error Messages
- Creative and conceptual design, providing graphic assets that help customize the chatbot's appearance.

