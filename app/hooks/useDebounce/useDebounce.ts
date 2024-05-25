import { useRef } from "react";

export default function useDebounce() {
  const debounceRef = useRef<NodeJS.Timeout>();

  function debounceCallback(callBack: () => void, delay?: number) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => {
        callBack();
      },
      delay !== undefined ? Math.abs(delay) : 400
    );
  }

  return debounceCallback;
}
