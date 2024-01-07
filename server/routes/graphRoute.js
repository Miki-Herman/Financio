const express = require('express');
const router = express.Router();

// Set this flag to true to use mock data, and false to use actual models
Transaction = require("../models/transaction");
TransactionType = require("../models/transactionType");

router.get("/get", async (req, res) => {
    try {
        // Předpokládáme, že `userId` je součástí těla požadavku (req.body)
        const userId = 2;
        console.log("Před dotazem do databáze, userId:", userId);

        // Pokud chybí povinná položka, vrátíme chybu 400 Bad Request
        if (!userId) {
            return res.status(400).json({ message: 'userId is required in the request body' });
        }

        // Získáme aktuální měsíc
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Měsíce jsou indexovány od 0

        // Nastavíme datum od začátku měsíce do konce měsíce
        const startOfMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0, 23, 59, 59, 999);

        // Najdeme všechny transakce uživatele v aktuálním měsíci
        const userTransactions = await Transaction.find({
            userId: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // Získáme unikátní kategorie transakcí
        const uniqueCategories = new Set([...userTransactions.map(transaction => transaction.category)]);

        // Inicializujeme graf
        const graph = [];

        // Získáme všechny kategorie z TransactionType
        const allTransactionTypes = await TransactionType.find();
        const allCategories = allTransactionTypes.map(transactionType => transactionType.name);

        // Projdeme všechny kategorie
        for (const category of allCategories) {
            // Získáme barvu z TransactionType
            const transactionType = await TransactionType.findOne({ name: category });
            const color = transactionType ? transactionType.color : "black";

            // Spočítáme součet transakcí v kategorii
            const categoryTransactions = userTransactions.filter(transaction => transaction.category === category);
            const categoryAmount = categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);

            // Přidáme do grafu
            if (category === "Income") {} else
            graph.push({
                value: categoryAmount,
                name: category,
                itemStyle: {
                    color: color
                }
            });
        }

        // Vrátíme odpověď s grafem
        res.json({ graph });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
