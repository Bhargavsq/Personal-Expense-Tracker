import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            setMessage(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: ""
            });

            // Go to login after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Start tracking your expenses
                    </p>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                        />

                    </div>


                    {/* Email */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                        />

                    </div>


                    {/* Password */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                            className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                        />

                    </div>


                    {/* Register button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 shadow-md transition"
                    >
                        Create Account
                    </button>

                </form>


                {/* Message */}
                {message && (
                    <p className="text-center text-sm text-green-600 mt-4">
                        {message}
                    </p>
                )}


                {/* Login link */}
                <p className="text-center text-gray-500 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:text-blue-700"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;