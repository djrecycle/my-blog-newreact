import { useRef, useEffect } from "react";

function useDocumentTitle(title) {
  const prevTitleRef = useRef(document.title);
  useEffect(() => {
    const previousTitle = prevTitleRef.current;
    document.title = title;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  useEffect(() => {
    prevTitleRef.current = document.title;
  }, []);

  // Kembalikan null karena ini adalah hook dan bukan komponen React
  return null;
}

export default useDocumentTitle;
