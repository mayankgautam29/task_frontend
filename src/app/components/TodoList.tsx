"use client";

import TodoItem from "./TodoItem";

export default function TodoList(props: any) {
  return (
    <div className="flex flex-col gap-5 mt-10 w-full max-w-3xl">
      {props.todos.map((t: any) => (
        <TodoItem key={t.id} {...props} t={t} />
      ))}
    </div>
  );
}