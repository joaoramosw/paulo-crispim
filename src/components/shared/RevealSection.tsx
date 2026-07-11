"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
};

export function RevealSection({ children, className = "", variant = "up", delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      const timeout = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const variantClass = {
    up: "translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
    scale: "scale-[0.98]",
  }[variant];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 ${
        isVisible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `${variantClass} opacity-0`
      }`}
    >
      {children}
    </div>
  );
}
