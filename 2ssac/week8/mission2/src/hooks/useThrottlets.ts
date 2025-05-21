import { useEffect, useRef, useState } from "react";

export const useThrottle = <T>(value: T, delay: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now - lastExecuted.current >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    }
    // else: skip update

  }, [value, delay]);

  return throttledValue;
};