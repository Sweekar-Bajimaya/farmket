'use client';
import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
    // Placeholder for authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const accessToken = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user');

        if (accessToken && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className="w-full shadow flex items-center justify-between px-46 py-4">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-[#0F172A]">
                    Farmket
                </Link>
            </div>
            {/* Navigation Links */}
            <div className="flex items-center gap-8">
                <Link href="/" className="text-lg text-gray-700 hover:text-green-700">Shop</Link>
                <Link href="/about" className="text-lg text-gray-700 hover:text-green-700">Categories</Link>
                <Link href="/offers" className="text-lg text-gray-700 hover:text-green-700">Deals</Link>
                {/* Search, Cart, User/Login */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FaShoppingCart className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">3</span>
                    </div>
                    
                    {/* Show Login button if not logged in */}
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    href="/auth/login"
                                    style={{ backgroundColor: "var(--primary-green)", color: "var(--primary-dark)" }}
                                    className="px-4 py-1 rounded hover:opacity-80 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/vendor-login"
                                    style={{
                                        backgroundColor: "rgba(var(--primary-green-rgb, 19, 236, 19), 0.1)",
                                        color: "var(--primary-green)",
                                    }}
                                    className="transition-colors px-4 py-1 rounded hover:bg-green-100"
                                >
                                    Vendor Login
                                </Link>
                            </>
                        ) : (
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <FaUserCircle className="h-8 w-8 text-green-700" />
                                <span className="text-gray-700">{user?.first_name || user?.username || 'User'}</span>
                            </div>
                            {/* Dropdown menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}