const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router(); 
const getMonthName = require("../middleware/getMonth")

router.use(express.json());

// overview/get
router.get("/get", async (req, res) => {
    const dtoIn = {
        "month": req.query.month,
        "year": req.query.year
    }
    try{
        const startDate = new Date(dtoIn.year, dtoIn.month - 1, 1);
        const endDate = new Date(dtoIn.year, dtoIn.month, 0);

        const itemsInMonth = await Transaction.find({
            date: {
                $gte: startDate.toISOString(),
                $lt: endDate.toISOString(),
            },
        });

        // Check if there are no items in the specified month
        if (!itemsInMonth || itemsInMonth.length === 0) {
            return res.status(404).json({ message: 'No items found in the specified month' });
        }

        // Display items in the specified month
        res.status(200).json({ message: 'Items retrieved successfully', data: itemsInMonth });
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// overview/list
router.get("/list", async (req, res) => {
    try {
        const transactions = await Transaction.find({});

        // Organize transactions by month and year
        const transactionsByMonthYear = {};

        transactions.forEach((transaction) => {
            const isoDate = transaction.date;

            // Extract month and year from the ISO date
            const date = new Date(isoDate);
            const monthYearKey = `${getMonthName(date.getMonth())}${date.getFullYear()}`;

            if (!transactionsByMonthYear[monthYearKey]) {
                transactionsByMonthYear[monthYearKey] = [];
            }

            transactionsByMonthYear[monthYearKey].push(transaction);
        });

        res.json(transactionsByMonthYear);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;