"use client";

import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export const SmoothScrollbar = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if ((e.ctrlKey || e.metaKey) && el.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: false });

    const scrollbar = Scrollbar.init(el, {
      damping: 0.1,
    });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      scrollbar.destroy();
    };
  }, []);

  return <div ref={ref} style={{ height: "100vh", overflow: "hidden" }}>{children}</div>;
};
