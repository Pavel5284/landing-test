"use client";

import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export const SmoothScrollbar = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollbar = Scrollbar.init(el, {
      damping: 0.1,
    });

    return () => {
      scrollbar.destroy();
    };
  }, []);

  return <div ref={ref} style={{ height: "100vh", overflow: "hidden" }}>{children}</div>;
};
