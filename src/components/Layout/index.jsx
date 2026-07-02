import { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../Aside";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-100 md:flex">
      {/* Barra superior (apenas mobile) com botão de menu */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
        <span className="font-helvetica-bold text-lg text-primary">Julius</span>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
          className="text-gray-200"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </header>

      <Aside mobileOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
