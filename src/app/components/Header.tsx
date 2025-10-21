"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className={`w-full ${isHome ? "bg-white" : "bg-[color:var(--brand-green)]"} sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto px-3 py-3 flex items-center justify-between">
        <Link
          href="/"
          className={`-ml-2 text-3xl tracking-tight ${isHome ? "text-[color:var(--brand-green)]" : "text-white"}`}
          style={{ fontFamily: 'var(--font-pacifico)' }}
        >
          H
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className={`${isHome ? "text-[color:var(--brand-green)]" : "text-white"}`}>
                Welcome, {user.displayName || user.email?.split('@')[0]}
              </span>
              <button 
                onClick={handleLogout}
                className={`hover:underline underline-offset-4 ${isHome ? "text-[color:var(--brand-green)]" : "text-white"}`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={`hover:underline underline-offset-4 ${isHome ? "text-[color:var(--brand-green)]" : "text-white"}`}>Log in</Link>
              <Link href="/signup" className={`rounded-md px-3 py-1.5 hover:opacity-90 ${isHome ? "bg-[color:var(--brand-green)] text-white" : "bg-white text-black"}`}>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


