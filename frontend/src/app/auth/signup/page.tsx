"use client";

import { useState } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email.split('@')[0], // Generate username from email
                    email,
                    password,
                    first_name: name.split(' ')[0] || '',
                    last_name: name.split(' ').slice(1).join(' ') || '',
                }),
            });
            const data = await response.json();
            
            if (!response.ok) {
                // Handle validation errors
                const errorMessage = Object.entries(data)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                throw new Error(errorMessage || 'Registration failed');
            }
            
            // Registration successful, redirect to login or home
            window.location.href = "/login";

        } catch (err: any) {
            setError(err.message || "An error occurred during registration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                    Sign Up for Farmket
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
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
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-green-700 hover:text-green-800 font-medium">
                            Login
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
