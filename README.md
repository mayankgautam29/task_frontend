# Todo App — Built with Next.js

A clean, minimal todo application I built using Next.js 14, TypeScript, and Tailwind CSS. It's nothing fancy — just a well-structured app that lets you manage your daily tasks without any backend or database needed.

---

## What it does

You can add new tasks, mark them as done, edit them if you typed something wrong, and delete ones you no longer need. Everything saves automatically to your browser's local storage, so your tasks are still there when you come back after closing the tab.

---

## Tech Stack

- **Next.js 14** — App Router for the project structure
- **TypeScript** — So the code doesn't explode silently
- **Tailwind CSS** — For styling without writing a single CSS file
- **React Icons** — For the small edit and delete icons
- **localStorage** — To persist data without needing a server

---

## Folder Structure

```
src/app/
├── components/
│   ├── TodoApp.tsx       # Main wrapper — holds all state and logic
│   ├── TodoForm.tsx      # The input field and Add button
│   ├── TodoItem.tsx      # A single todo row with edit/delete
│   └── TodoList.tsx      # Renders the list of TodoItems
├── hooks/
│   └── useLocalStorage.ts  # Custom hook — saves todos to localStorage
├── globals.css
├── layout.tsx            # Root layout with background gradient
└── page.tsx              # Entry point — just renders TodoApp
```

---

## How the code is organized

I kept things simple. All the logic — adding, deleting, toggling, editing — lives in `TodoApp.tsx`. It passes everything down as props to the smaller components. There's no global state, no context, no Redux. Just useState and a custom hook.

**TodoApp.tsx** is the brain. It manages:
- The list of todos (saved via `useLocalStorage`)
- The current input text
- Which todo is being edited right now

**TodoForm.tsx** is just a controlled input and a submit button. Nothing else.

**TodoItem.tsx** handles how each todo looks. When you click edit, it swaps the text out for an input field inline — no popups or modals.

**TodoList.tsx** is literally just a loop that renders TodoItems.

**useLocalStorage.ts** is a custom hook that works exactly like `useState` but also syncs the value to `localStorage` every time it changes.

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/mayankgautam29/task_frontend
cd todo-app
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. That's it.

---

## Features

- Add a task by typing and pressing Enter or clicking Add
- Click the circle checkmark to mark a task complete (it fades out with a strikethrough)
- Hover over a task to reveal the Edit and Delete buttons
- Click Edit to rename a task inline, then hit Save
- Completed tasks cannot be edited — you'd need to uncheck them first
- All data persists in localStorage — no account or server needed

---

## Things I'd add later

- Drag to reorder tasks
- Due dates and priority labels
- Filter by completed / active
- Dark/light mode toggle
- Maybe a simple backend with a database if it ever needs to be shared across devices

---

## Notes

The background is a deep navy with a blue-to-purple radial gradient defined in `layout.tsx`. The cards use `bg-slate-700` so they stand out against the darker page. Action buttons (edit/delete) are hidden by default on desktop and revealed on hover — on mobile they're always visible since there's no hover state on touch screens.
