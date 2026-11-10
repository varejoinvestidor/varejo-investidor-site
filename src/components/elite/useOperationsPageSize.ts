"use client";

import { useEffect, useState } from "react";

/** Mobile 6 · tablet 9 · desktop 12 cards por página. */
export function useOperationsPageSize() {
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 639px)");
    const wide = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      if (narrow.matches) setPageSize(6);
      else if (wide.matches) setPageSize(12);
      else setPageSize(9);
    };

    apply();
    narrow.addEventListener("change", apply);
    wide.addEventListener("change", apply);
    return () => {
      narrow.removeEventListener("change", apply);
      wide.removeEventListener("change", apply);
    };
  }, []);

  return pageSize;
}
