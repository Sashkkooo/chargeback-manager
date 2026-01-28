import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight mb-8">
                    Chargeback Manager
                </h2>

                <nav className="flex flex-col gap-2 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/new"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        New Case
                    </NavLink>
                </nav>

                <div className="mt-auto pt-6 text-xs text-gray-400">
                    © {new Date().getFullYear()} Chargeback Manager
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
}
