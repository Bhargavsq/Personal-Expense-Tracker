import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠",
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: "💳",
        },
        {
            name: "Calendar",
            path: "/calendar",
            icon: "📅",
        },
        {
            name: "Analysis",
            path: "/analysis",
            icon: "📊",
        },
        {
            name: "Budgets",
            path: "/budgets",
            icon: "💰",
        },
        {
            name: "Bills",
            path: "/bills",
            icon: "🧾",
        },
        {
            name: "Goals",
            path: "/goals",
            icon: "🎯",
        },
        {
            name: "Reports",
            path: "/reports",
            icon: "📑",
        },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 shadow-lg p-5">

            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-800">
                    💰 Expense Tracker
                </h1>

                <p className="text-xs text-gray-500 mt-1">
                    Personal Finance
                </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-0.5">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                isActive
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "text-gray-600 hover:bg-white/70 hover:text-blue-600"
                            }`
                        }
                    >
                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </nav>

            {/* Future AI */}
            <div className="mt-8 pt-6 border-t border-gray-200">

                <p className="text-xs text-gray-400 uppercase mb-2 px-2">
                    Future
                </p>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed">
                    <span className="text-lg">🤖</span>

                    <div>
                        <p className="font-medium">
                            AI Assistant
                        </p>
                    </div>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;