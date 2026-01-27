import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-xl font-bold mb-6">Chargeback Manager</h2>

                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/"
                        className="px-3 py-2 rounded hover:bg-gray-200"
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/new"
                        className="px-3 py-2 rounded hover:bg-gray-200"
                    >
                        New Case
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}
