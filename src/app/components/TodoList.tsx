"use client";

import TodoItem from "./TodoItem";

export default function TodoList(props: any) {
  if (!props.todos || props.todos.length === 0) {
    return (
      <div className="w-full flex justify-center mt-10">
        <p className="text-slate-400 text-lg font-medium">
          No tasks yet.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 mt-10 w-full max-w-3xl">
      {props.todos.map((t: any) => (
        <TodoItem key={t.id} {...props} t={t} />
      ))}
    </div>
  );
}
