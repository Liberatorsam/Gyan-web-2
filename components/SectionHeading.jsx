import React from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-2 mb-4", align === "center" && "justify-center")}>
          <span className="h-px w-8 ascent-line rounded-full" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</span>
          <span className="h-px w-8 ascent-line rounded-full" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground text-pretty leading-relaxed">{description}</p>
      )}
    </div>
  );
}