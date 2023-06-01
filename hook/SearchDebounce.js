import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {

    if (!isDirty && debouncedValue !== "") return setIsDirty(true);
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, isDirty]);

  return [debouncedValue, isDirty];
}
