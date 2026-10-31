"use client";

export function smoothScrollTo(targetId: string) {
  if (typeof window === "undefined") return;

  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  const container = document.querySelector(".snap-container") as HTMLElement | null;

  if (container) {
    // If container is scrolling
    container.scrollTo({
      top: targetEl.offsetTop,
      behavior: "smooth"
    });
  } else {
    // Fallback to native window scroll
    targetEl.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
