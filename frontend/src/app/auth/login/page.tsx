"use client";

import { useState } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        
        try{
            const response = await fetch(API_ENDPOINTS.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || data.non_field_errors?.[0] || "Login failed");
            }
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to home or dashboard
            window.location.href = "/";
        } catch (err: any) {
            setError(err.message || "An error occurred during login.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                    Login to Farmket
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="text-green-700 hover:text-green-800 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
