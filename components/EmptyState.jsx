import React from "react";
import { cn } from "@/lib/utils";

// Professional empty-state for sections without data yet.
export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center", className)}>
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-3 max-w-md text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}