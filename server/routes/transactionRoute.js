const express = require('express');
const Transaction = require('../models/transaction');
const TransactionTypes = require('../models/transactionType')
const router = express.Router();

router.use(express.json());

// transaction/delete
router.delete("/delete", async (req, res) => {
    const dtoIn = {
        "id": req.query.id
    }
    try {
        // Find the object by ID and delete it
        const deletedObject = await Transaction.findOneAndDelete(dtoIn);

        // Check if the object exists
        if (!deletedObject) {
            return res.status(404).json({ message: 'Object not found' });
        }

        res.status(200).json({ message: 'Object deleted successfully', data: deletedObject });
    } catch (error) {
        console.error('Error deleting object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// transaction/create
router.post("/create", async (req, res) => {
    const dtoIn = req.body;
    const new_trans = new Transaction(
        {
            "id": dtoIn.id,
            "amount": dtoIn.amount,
            "category": dtoIn.category,
            "description": dtoIn.description,
            "date": dtoIn.date,
            "userId": dtoIn.userId
        }
    );

    await new_trans.save()
    res.send(
        {
            "error":
                {
                    "code":200,
                    "msg": "Ok"
                }
        }
    )
});

// transaction/edit
router.post("/edit", async (req, res) => {
    const dtoIn = req.body
    const date = new Date()

    const updateData = {
        "id": dtoIn.id,
        "amount": dtoIn.amount,
        "category": dtoIn.category,
        "description": dtoIn.description,
        "date": date,
        "userId": dtoIn.userId
    }

    try {
        // Find the object by ID and update it
        const updatedObject = await Transaction.findOneAndUpdate({"id": dtoIn.id}, updateData, { new: true })

        // Check if the object exists
        if (!updatedObject) {
            return res.status(404).json({ message: 'Object not found' });
        }

        res.status(200).json({ message: 'Object updated successfully', data: updatedObject });
    } catch (error) {
        console.error('Error updating object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// transaction/list
router.get("/list",  async(req, res) => {
    const dtoIn = {
        "userId": req.query.userId
    }
    try {
        const object = await Transaction.find(dtoIn);
        const transTypes = await TransactionTypes.find();

        if (!object) {
            return res.status(404).json({ message: 'Object not found' });
        }

        res.status(200).json({ message: 'Object retrieved successfully', data: object, types: transTypes });
    } catch (error) {
        console.error('Error retrieving object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router
