import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.theme || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <div className="flex gap-2">
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")} className="px-3 py-3 cursor-pointer border rounded-full">☀️ Light</button>
      ) : (
      <button onClick={() => setTheme("dark")} className="px-3 py-3 cursor-pointer border rounded-full">🌙 Dark</button>

      )}
      {/* <button onClick={() => setTheme("system")} className="px-2 py-1 border rounded">🖥 System</button> */}
    </div>
  );
}
