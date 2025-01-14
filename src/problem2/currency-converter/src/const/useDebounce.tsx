import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T = null, N = any, X = any>(
  callback: (v?: T, p?: N, x?: X) => void,
  timeout = 500
) => {
  const ref = useRef<any>();

  const clear = () => {
    if (ref.current) clearTimeout(ref.current);
  };

  const handle = (v?: T, p?: N, x?: X) => {
    clear();
    ref.current = setTimeout(() => {
      callback(v, p, x);
    }, timeout);
  };

  useEffect(() => {
    return clear;
  }, []);

  return handle;
};
