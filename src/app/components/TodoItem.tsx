"use client";

import { FaTrash, FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  t?: Todo;
  toggle: (id: string) => void;
  deleteTodo: (id: string) => void;
  startEdit: (t: Todo) => void;
  editId: string | null;
  editText: string;
  setEditText: (value: string) => void;
  saveEdit: React.FormEventHandler<HTMLFormElement>;
}

export default function TodoItem({
  t,
  toggle,
  deleteTodo,
  startEdit,
  editId,
  editText,
  setEditText,
  saveEdit,
}: TodoItemProps) {
  if (!t) {
    return (
      <div className="text-center text-slate-400 mt-6">
        No tasks yet.
      </div>
    );
  }
  const isEditing = editId === t.id;
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 shadow-sm
        ${
          t.isCompleted
            ? "bg-slate-900 border-slate-800 opacity-55"
            : "bg-slate-900 border-slate-700 hover:border-slate-500 hover:shadow-slate-950/60 hover:shadow-md"
        }`}
    >
      <button
        onClick={() => toggle(t.id)}
        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${
            t.isCompleted
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-slate-500 text-transparent hover:border-emerald-400 hover:text-emerald-400"
          }`}
      >
        <FaCheck className="text-[10px]" />
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <form onSubmit={saveEdit} className="flex gap-2">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              className="flex-1 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Save
            </button>
          </form>
        ) : (
          <span
            className={`block text-sm font-medium truncate transition-all
              ${
                t.isCompleted ? "line-through text-slate-500" : "text-slate-100"
              }`}
          >
            {t.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => startEdit(t)}
            className="p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
          >
            <MdEdit className="text-base" />
          </button>

          <button
            onClick={() => deleteTodo(t.id)}
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
}