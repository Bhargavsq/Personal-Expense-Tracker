import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen from-slate-100 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="ml-64 min-h-screen">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;