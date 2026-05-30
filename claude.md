# Project Context: e-portfolio

## Tech Stack
- **Frontend Framework:** React 19 (Vite)
- **Language:** TypeScript / JavaScript (Delete the one you aren't using)
- **Styling:** Tailwind CSS v4 (Using the new CSS-first `@theme` configuration)
- **Runtime Environment:** Node.js v24

---

## Architectural Rules & Guidelines

### 1. Component Structure
- Use functional components with arrow syntax: `const MyComponent = () => {}`.
- Place components in `src/components/`.
- Prioritize creating small, reusable, and modular UI components.

### 2. Styling (Tailwind CSS v4)
- **CRITICAL:** Do not look for or create a `tailwind.config.js` file. This project uses Tailwind CSS v4.
- All theme configurations (colors, fonts, breakpoints) must be handled inside `src/index.css` using the `@theme` directive.
- Prefer standard utility classes. Avoid writing raw CSS unless absolutely necessary.

### 3. State & Logic
- Use modern React hooks (`useState`, `useEffect`, `useMemo`).
- Keep state as local as possible. Do not introduce global state managers (like Redux or Zustand) unless explicitly requested.

### 4. Code Quality
- Ensure all components are fully responsive (mobile-first approach).
- Write clean, self-documenting code with minimal comments unless explaining complex logic.
- Maintain strict typing if using TypeScript.

---

## Development Commands
- Start Dev Server: `npm run dev`
- Build Project: `npm run build`
- Preview Build: `npm run preview`
