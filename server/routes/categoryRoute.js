const express = require('express');
const TransactionTypes = require("../models/transactionType");
const router = express.Router();

router.use(express.json());

router.get("list", async (req, res) => {
   try{
       const transTypes = await TransactionTypes.find();

       if(!transTypes) {
           return res.status(404).json({ message: 'Categories not found' });
       }

       res.status(200).json({ message: 'Object retrieved successfully', types: transTypes });
   } catch (error) {
       console.error('Error retrieving object:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
});

module.exports = router()
