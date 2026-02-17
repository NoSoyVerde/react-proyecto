"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  initialIndex?: number;
};

export default function ImageGallery({ images, initialIndex = 0 }: Props) {
  const [active, setActive] = useState<number>(
    Math.min(Math.max(initialIndex, 0), Math.max(0, images.length - 1))
  );

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <span className="text-sm text-muted-foreground">No image</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-lg border" style={{ aspectRatio: '4 / 5' }}>
        <Image
          src={images[active]}
          alt={`Imagen ${active + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center gap-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={cn(
              "relative w-20 h-20 overflow-hidden rounded border focus:outline-none",
              idx === active ? "ring-2 ring-orange-400" : ""
            )}
            aria-label={`Ver imagen ${idx + 1}`}
            type="button"
          >
            <Image src={src} alt={`thumb ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
