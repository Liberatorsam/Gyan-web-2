import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/gyanImages";

// Official GYAN logo (blue wordmark on white) shown inside a white tile so it
// reads cleanly over dark heroes and in the footer. The variant prop is kept
// for backwards compatibility with existing callers but no longer changes styling.
export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`group inline-flex ${className}`} aria-label="Global Youth & Adolescents Network — Home">
      <span className="flex items-center rounded-xl bg-white px-2 py-1.5 shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-[1.03]">
        <Image
          src={IMAGES.logo}
          alt="GYAN — Global Youth & Adolescents Network"
          className="h-10 w-[6.25rem] lg:h-11 lg:w-[6.875rem]"
          focalPointY={0.49}
        />
      </span>
    </Link>
  );
}