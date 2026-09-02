import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const [darkMode, setDarkMode] = React.useState(
        localStorage.getItem("theme") === "dark"
    );

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">

            {/* Left */}
            <div>
                <h1 className="text-xl font-semibold text-gray-800">
                    Personal Finance
                </h1>

                <p className="text-sm text-gray-500">
                    Manage your money smarter
                </p>
            </div>



            {/* Right */}
            <div className="flex items-center gap-5">

                {/* User */}
                <div className="flex items-center gap-3">

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">
                            {user?.name || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            Personal Account
                        </p>
                    </div>

                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Navbar;