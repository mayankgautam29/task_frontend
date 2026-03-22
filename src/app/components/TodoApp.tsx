"use client";

import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default function TodoApp() {
  const [todo, setTodo] = useLocalStorage<Todo[]>("todos", []);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: input,
      isCompleted: false,
    };
    setTodo([newTodo, ...todo]);
    setInput("");
  };

  const deleteTodo = (id: string) => {
    setTodo(todo.filter((t) => t.id !== id));
  };

  const toggle = (id: string) => {
    setTodo(
      todo.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const startEdit = (t: Todo) => {
    if (t.isCompleted) return;
    setEditId(t.id);
    setEditText(t.title);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodo(todo.map((t) => (t.id === editId ? { ...t, title: editText } : t)));
    setEditId(null);
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold uppercase mb-5 text-white tracking-wide">
        Todo Task
      </h1>
      <TodoForm input={input} setInput={setInput} addTodo={addTodo} />
      <TodoList
        todos={todo}
        toggle={toggle}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
        editId={editId}
        editText={editText}
        setEditText={setEditText}
        saveEdit={saveEdit}
      />
    </div>
  );
}
