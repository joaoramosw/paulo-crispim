import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      <h2 className="text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F7F8]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#D8DEE2] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
