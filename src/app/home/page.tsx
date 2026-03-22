"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface todo_inf {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default function home() {
  const [todo, setTodo] = useState<todo_inf[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored && stored !== "undefined") {
      try {
        setTodo(JSON.parse(stored));
      } catch (error) {
        console.log("Invalid json");
        setTodo([]);
      }
      setTodo(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (e: any) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    const newTodo: todo_inf = {
      id: Date.now().toString(),
      title: input,
      isCompleted: false,
    };
    setTodo([newTodo, ...todo]);
    setInput("");
  };
  const deleteTodo = (id: String) => {
    setTodo(todo.filter((t) => t.id !== id));
  };

  const toggle = (id: String) => {
    setTodo(
      todo.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const startEdit = (t: todo_inf) => {
    if (t.isCompleted) {
      return;
    }
    setEditId(t.id);
    setEditText(t.title);
  };

  const saveedt = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodo(todo.map((t) => (t.id === editId ? { ...t, title: editText } : t)));
    setEditId(null);
  };
  return (
    <div className="w-full min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-5 text-center">
        Todo Task
      </h1>

      {/* Add Todo */}
      <form
        onSubmit={addTodo}
        className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Todo..."
          className="w-full p-3 sm:p-4 rounded-lg bg-gray-700 text-white"
        />
        <button className="w-full sm:w-auto bg-blue-600 px-5 py-2 rounded-lg text-white">
          Add
        </button>
      </form>

      {/* Todos */}
      <div className="flex flex-col gap-5 mt-10 w-full max-w-3xl items-center">
        {todo.map((t) => (
          <div
            key={t.id}
            className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 bg-slate-900 py-4 px-4 sm:px-6 md:px-10 rounded-2xl"
            style={{
              textDecoration: t.isCompleted ? "line-through" : "none",
              opacity: t.isCompleted ? 0.5 : 1,
            }}
          >
            {/* Toggle */}
            <button
              onClick={() => toggle(t.id)}
              className={`px-4 py-2 rounded-lg text-white ${
                t.isCompleted ? "bg-green-400" : "bg-blue-500"
              }`}
            >
              <FaCheck />
            </button>

            {/* Title / Edit */}
            {editId === t.id ? (
              <form
                onSubmit={saveedt}
                className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto sm:grow mx-0 sm:mx-4"
              >
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <button className="bg-yellow-500 px-3 py-1 rounded w-full sm:w-auto">
                  Save
                </button>
              </form>
            ) : (
              <span className="font-bold uppercase text-center w-full sm:grow">
                {t.title}
              </span>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={() => startEdit(t)} className="text-white">
                <MdEdit />
              </button>

              <button
                onClick={() => deleteTodo(t.id)}
                className="bg-red-400 px-4 py-2 rounded-lg text-white"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
