"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored && stored !== "undefined") {
      try {
        setValue(JSON.parse(stored));
      } catch {
        console.log("Invalid JSON");
        setValue(initialValue);
      }
    }
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}