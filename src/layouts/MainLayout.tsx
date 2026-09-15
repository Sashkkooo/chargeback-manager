import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg transition ${isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-gray-100"
    }`;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <nav className="flex flex-col gap-2 text-sm font-medium">
            <NavLink to="/" className={navLinkClass} onClick={onNavigate}>
                Dashboard
            </NavLink>
            <NavLink to="/new" className={navLinkClass} onClick={onNavigate}>
                New Case
            </NavLink>
        </nav>
    );
}

export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="hidden md:flex md:w-64 bg-white shadow-lg p-6 flex-col">
                <h2 className="text-2xl font-bold tracking-tight mb-8">
                    Chargeback Manager
                </h2>

                <NavLinks />

                <div className="mt-auto pt-6 text-xs text-gray-400">
                    © {new Date().getFullYear()} Chargeback Manager
                </div>
            </aside>

            <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white shadow-lg flex items-center justify-between px-4 py-3">
                <h2 className="text-lg font-bold tracking-tight">Chargeback Manager</h2>
                <button
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMenuOpen(false)}
                    />
                    <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight">Menu</h2>
                            <button
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                                className="p-1 text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>
                        <NavLinks onNavigate={() => setMenuOpen(false)} />
                    </aside>
                </div>
            )}

            <main className="flex-1 p-4 pt-20 md:p-10 md:pt-10 min-w-0">
                <Outlet />
            </main>
        </div>
    );
}
