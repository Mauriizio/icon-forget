// /lib/use-async-task.js
// Hook para envolver tareas async y exponer running/error de forma reutilizable.

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * @template TArgs, TResult
 * @param {(…args: any[]) => Promise<TResult>} asyncFn
 * @param {{ onError?: (err:any)=>void, onFinally?: ()=>void }} [opts]
 */
export function useAsyncTask(asyncFn, opts = {}) {
  const { onError, onFinally } = opts;
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(
    async (...args) => {
      if (running) return; // evita doble click
      setError(null);
      setRunning(true);
      try {
        const result = await asyncFn(...args);
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        onError?.(e);
        return undefined;
      } finally {
        if (mounted.current) setRunning(false);
        onFinally?.();
      }
    },
    [asyncFn, running, onError, onFinally]
  );

  const reset = useCallback(() => setError(null), []);

  return { run, running, error, reset };
}
