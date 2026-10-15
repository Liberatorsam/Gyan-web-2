import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Animated counter — only animates when a real numeric value is provided.
// When value is null/undefined, renders a placeholder dash so admins can fill it later.
export default function StatCounter({ value, label, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value == null || !inView) return;
    let frame;
    const duration = 1400;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, inView]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight" aria-live="polite">
        {value == null ? <span className="text-white/40">—</span> : <>{display.toLocaleString()}{suffix}</>}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-white/70">{label}</div>
    </div>
  );
}