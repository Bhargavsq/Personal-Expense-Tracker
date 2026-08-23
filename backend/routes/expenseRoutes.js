const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// GET all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
});

// POST - Add new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        const expense = new Expense({
            title,
            amount,
            category,
            date,
            descriptions
        });

        const savedExpense = await expense.save();

        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({
            message: "Failed to add expense",
            error: error.message
        });
    }
});

module.exports = router;