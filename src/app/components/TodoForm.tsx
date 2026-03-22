"use client";

export default function TodoForm({ input, setInput, addTodo }: any) {
  return (
    <form onSubmit={addTodo} className="flex gap-3 w-full max-w-xl">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-xl border border-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2 rounded-xl text-white font-medium">
        Add
      </button>
    </form>
  );
}
