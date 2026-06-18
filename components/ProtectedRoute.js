"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return <p className="p-4 text-slate-500">Loading...</p>;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return (
            <div className="p-6 text-red-600 font-semibold">
                Access Denied
            </div>
        );
    }

    return children;
}