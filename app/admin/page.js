"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  return (
      <ProtectedRoute>
        {user?.role === "ADMIN" ? (
            <div className="p-6">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-slate-600 mt-2">
                Welcome to the back office.
              </p>

              <div className="mt-6 p-4 border rounded bg-white">
                Danger Zone 🔥
              </div>
            </div>
        ) : (
            <div className="p-6 text-red-600 font-semibold">
              Access Denied
            </div>
        )}
      </ProtectedRoute>
  );
}