import React, { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [expenses, setExpenses] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        category: "",
        date: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    // Fetch expenses
    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add / Update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                ...formData,
                amount: Number(formData.amount)
            };

            if (editingId) {
                await api.put(
                    `/expenses/${editingId}`,
                    data
                );

                setMessage(
                    "Expense updated successfully!"
                );
            } else {
                await api.post("/expenses", data);

                setMessage(
                    "Expense added successfully!"
                );
            }

            setFormData({
                title: "",
                description: "",
                amount: "",
                category: "",
                date: ""
            });

            setEditingId(null);

            fetchExpenses();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Operation failed"
            );
        }
    };

    // Edit
    const handleEdit = (expense) => {
        setEditingId(expense._id);

        setFormData({
            title: expense.title,
            description: expense.description || "",
            amount: expense.amount,
            category: expense.category,
            date: expense.date
                ? expense.date.substring(0, 10)
                : ""
        });

        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Cancel edit
    const handleCancel = () => {
        setEditingId(null);

        setFormData({
            title: "",
            description: "",
            amount: "",
            category: "",
            date: ""
        });

        setMessage("");
    };

    // Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/expenses/${id}`);

            setMessage(
                "Expense deleted successfully!"
            );

            fetchExpenses();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete expense"
            );
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    // Total expenses
    const totalExpenses = expenses.reduce(
        (total, expense) =>
            total + Number(expense.amount),
        0
    );

    // Categories
    const categories = [
        "All",
        ...new Set(
            expenses.map(
                (expense) => expense.category
            )
        )
    ];

    // Search + filter
    const filteredExpenses = expenses.filter(
        (expense) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                expense.title
                    .toLowerCase()
                    .includes(searchText) ||
                expense.description
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                categoryFilter === "All" ||
                expense.category ===
                categoryFilter;

            return (
                matchesSearch &&
                matchesCategory
            );
        }
    );

    return (
        <div className="min-h-screen  from-slate-100 via-white to-blue-100">

            
            {/* Main */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">


                {/* Welcome */}
                <div className="mb-8">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Dashboard
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage and track your daily expenses.
                    </p>

                </div>


                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

                    {/* Total */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border">

                        <p className="text-gray-500 text-sm">
                            Total Expenses
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            ₹{totalExpenses.toLocaleString("en-IN")}
                        </h2>

                    </div>


                    {/* Transactions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border">

                        <p className="text-gray-500 text-sm">
                            Transactions
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            {expenses.length}
                        </h2>

                    </div>

                </div>


                {/* Add / Edit Expense */}
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-6">

                        {editingId
                            ? "Edit Expense"
                            : "Add Expense"}

                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Dinner"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                            />
                        </div>


                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                placeholder="e.g. 500"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                            />
                        </div>


                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="e.g. Food"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                            />
                        </div>


                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition"
                            />
                        </div>


                        {/* Description */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Add a description..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />

                        </div>


                        {/* Buttons */}
                        <div className="md:col-span-2 flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-500/90 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 shadow-md transition"
                            >
                                {editingId
                                    ? "Update Expense"
                                    : "Add Expense"}
                            </button>


                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>


                    {/* Message */}
                    {message && (
                        <p className="mt-4 text-sm text-green-600">
                            {message}
                        </p>
                    )}

                </div>


                {/* Expense List */}
                <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                        <h2 className="text-xl font-semibold text-gray-800">
                            My Expenses
                        </h2>


                        {/* Search + Filter */}
                        <div className="flex flex-col sm:flex-row gap-3">

                            <input
                                type="text"
                                placeholder="Search expenses..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />


                            <select
                                value={categoryFilter}
                                onChange={(e) =>
                                    setCategoryFilter(
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    {/* List */}
                    {filteredExpenses.length === 0 ? (

                        <div className="text-center py-10">

                            <p className="text-gray-500">
                                No matching expenses found.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {filteredExpenses.map(
                                (expense) => (

                                    <div
                                        key={expense._id}
                                        className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 hover:bg-white/60 hover:shadow-md transition-all duration-200"
                                    >

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                            {/* Expense Info */}
                                            <div>

                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {expense.title}
                                                </h3>

                                                {expense.description && (
                                                    <p className="text-gray-500 mt-1">
                                                        {expense.description}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-400 mt-2">
                                                    {new Date(
                                                        expense.date
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>


                                            {/* Amount + Actions */}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                                                <div>

                                                    <p className="text-xl font-bold text-gray-800">
                                                        ₹{Number(
                                                            expense.amount
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>

                                                    <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mt-1">
                                                        {expense.category}
                                                    </span>

                                                </div>


                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                expense
                                                            )
                                                        }
                                                        className="bg-amber-400/90 text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition"
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                expense._id
                                                            )
                                                        }
                                                        className="bg-red-500/90 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Dashboard;