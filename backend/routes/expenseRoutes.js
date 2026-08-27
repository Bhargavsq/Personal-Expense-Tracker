const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET all expenses
router.get("/", authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.userId
        }).sort({ date: -1 });

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
});


// POST - Add new expense
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            title,
            description,
            amount,
            category,
            date
        } = req.body;

        const expense = new Expense({
            title,
            description,
            amount,
            category,
            date,
            user: req.user.userId
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
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

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
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
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
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedExpense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

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