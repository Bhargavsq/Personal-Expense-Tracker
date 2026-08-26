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
        const { title, description, amount, category, date } = req.body;

        const expense = new Expense({
            title,
            description,
            amount,
            category,
            date
        });

        const savedExpense = await expense.save();

        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({
            message: "Failed to add expense",
            error: error.message
        });
    }
});

// GET single expense
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get expense",
            error: error.message
        });
    }
});

// UPDATE expense
router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json(updatedExpense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update expense",
            error: error.message
        });
    }
});

// DELETE expense
router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully",
            expense: deletedExpense
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete expense",
            error: error.message
        });
    }
});

module.exports = router;