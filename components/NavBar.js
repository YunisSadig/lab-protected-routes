"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
      <nav className="flex items-center justify-between p-4 border-b bg-white">
        <div className="font-bold">PostHub</div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
              <button
                  onClick={() => router.push("/login")}
                  className="text-indigo-600"
              >
                Login
              </button>
          ) : (
              <>
            <span className="text-sm text-slate-600">
              {user?.name} ({user?.role})
            </span>

                <button
                    onClick={handleLogout}
                    className="text-red-600 text-sm"
                >
                  Sign Out
                </button>
              </>
          )}
        </div>
      </nav>
  );
}