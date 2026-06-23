"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { toolsTypes } from "@/lib/types";

type ToolsMarqueeProps = {
  TOOLS_ONE: toolsTypes[]
  TOOLS_TWO: toolsTypes[]
}

export default function ToolsMarquee({TOOLS_ONE, TOOLS_TWO}: ToolsMarqueeProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const tweens: gsap.core.Tween[] = [];

  const setupMarquee = (el: HTMLDivElement, direction: 1 | -1, speed = 40) => {
    // Measure BEFORE cloning — scrollWidth here = N*itemW + (N-1)*gap
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const totalWidth = el.scrollWidth + gap; // N*(itemW + gap) — exact loop distance

    Array.from(el.children).forEach((child) => {
      el.appendChild(child.cloneNode(true));
    });

    gsap.set(el, { x: direction === -1 ? 0 : -totalWidth });

    const tween = gsap.to(el, {
      x: direction === -1 ? -totalWidth : 0,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
    });

    tweens.push(tween);
  };

  if (row1Ref.current) setupMarquee(row1Ref.current, -1);
  if (row2Ref.current) setupMarquee(row2Ref.current, 1);

  return () => tweens.forEach((t) => t.kill()); // cleanup on unmount
}, []);

  return (
    <div className="overflow-hidden">
      {/* Row 1 — moves left */}
      <div className="flex overflow-hidden">
        <div ref={row1Ref} className="flex gap-8 will-change-transform">
          {TOOLS_ONE.map((icon, i) => (
            <ToolCard key={i} icon={icon} />
          ))}
        </div>
      </div>

      {/* Row 2 — moves right */}
      <div className="flex overflow-hidden md:mt-12 mt-8">
        <div ref={row2Ref} className="flex gap-8 will-change-transform">
          {TOOLS_TWO.map((icon, i) => (
            <ToolCard key={i} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolCard({ icon }: { icon: { image: string; name: string } }) {
  return (
    <div className="shrink-0 overflow-hidden bg-gray-200 rounded-xl p-4 flex flex-col justify-center items-center md:w-40 md:h-40 h-30 w-30 gap-3">
      <Image
        className="object-contain object-center w-10 h-10"
        src={icon.image}
        alt={icon.name}
        width={40}
        height={40}
      />
      <p className="text-lg">{icon.name}</p>
    </div>
  );
}