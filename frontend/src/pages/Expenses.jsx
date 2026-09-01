import React, { useEffect, useState } from "react";
import api from "../services/api";

function Expenses() {
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

    // Fetch expenses
    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add / Update expense
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                // Update
                await api.put(`/expenses/${editingId}`, {
                    ...formData,
                    amount: Number(formData.amount)
                });

                setMessage("Expense updated successfully!");
            } else {
                // Add
                await api.post("/expenses", {
                    ...formData,
                    amount: Number(formData.amount)
                });

                setMessage("Expense added successfully!");
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

    // Start editing
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
    };

    // Cancel editing
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

    // Delete function
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/expenses/${id}`);

            setMessage("Expense deleted successfully!");

            fetchExpenses();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete expense"
            );
        }
    };

    return (
        <div>
            <h1>Personal Expense Tracker</h1>

            <h2>
                {editingId ? "Edit Expense" : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    {editingId ? "Update Expense" : "Add Expense"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

            </form>

            {message && <p>{message}</p>}

            <h2>My Expenses</h2>

            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense._id}>

                        <h3>{expense.title}</h3>

                        <p>
                            Amount: ₹{expense.amount}
                        </p>

                        <p>
                            Category: {expense.category}
                        </p>

                        <p>
                            {expense.description}
                        </p>

                        <p>
                            {new Date(expense.date).toLocaleDateString()}
                        </p>

                        <button
                            onClick={() => handleEdit(expense)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(expense._id)}
                        >
                            Delete
                        </button>

                    </div>
                ))
            )}
        </div>
    );
}

export default Expenses;