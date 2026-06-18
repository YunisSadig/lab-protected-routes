"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function PostsPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();
            setPosts(data.slice(0, 10));
        }

        fetchPosts();
    }, []);

    function handleDelete(id) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    }

    return (
        <ProtectedRoute>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold">Posts</h1>

                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                        <h2 className="font-semibold">{post.title}</h2>
                        <p className="text-sm text-slate-600">{post.body}</p>

                        {/* ADMIN DELETE BUTTON */}
                        {user?.role === "ADMIN" && (
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="mt-3 text-sm text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </ProtectedRoute>
    );
}