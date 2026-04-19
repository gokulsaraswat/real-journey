"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={() => {
        window.requestAnimationFrame(() => {
          document.getElementById("main-content")?.focus();
        });
      }}
    >
      Skip to main content
    </a>
  );
}
