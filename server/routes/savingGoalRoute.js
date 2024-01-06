const express = require('express');
const SavingGoal = require('../models/savingGoal');
const router = express.Router();


router.use(express.json());

router.get("/get", async (req, res) => {
    try {
      const userId = req.body.userId;
  
      console.log("Před dotazem do databáze, userId:", userId);

      
      const userSavingGoal = await SavingGoal.find({ userId: userId });

      console.log("Po dotazu do databáze");
  
      if (!userSavingGoal) {
        console.log("Nenalezen žádný savingGoal");
        return res.status(404).json({ message: 'Saving goal not found for the user' });
      }
  
      console.log("Nalezen savingGoal:", userSavingGoal);
      res.json({
        userSavingGoal: userSavingGoal
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});




router.post("/create", async (req, res) => {
    try {
       
        const { id, goal } = req.body;
        const userId = req.body.userId;
        if (!id || !goal) {
            return res.status(400).json({ message: 'Both id and goal are required in the request body' });
        }

        console.log("Před vytvořením nového savingGoal");

        const newSavingGoal = new SavingGoal({
            id: id,
            goal: goal,
            userId:userId,
            saved:0
        });

        await newSavingGoal.save();

        console.log("Nový savingGoal vytvořen");

        res.status(200).json({ message: 'Saving goal created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post("/edit", async (req, res) => {
    try {
        const { id, newGoal } = req.body;

        if (!id || !newGoal) {
            return res.status(400).json({ message: 'Both id and newGoal are required in the request body' });
        }

        console.log("Před úpravou savingGoal");

        const updatedSavingGoal = await SavingGoal.findOneAndUpdate(
            { id: id },
            { $set: { goal: newGoal } },
            { new: true } 
        );

        if (!updatedSavingGoal) {
            console.log("Nenalezen savingGoal pro úpravu");
            return res.status(404).json({ message: 'Saving goal not found for the provided id' });
        }

        console.log("SavingGoal byl úspěšně upraven");

        res.status(200).json({ message: 'Saving goal updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete("/delete", async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'id is required in the request body' });
        }

        console.log("Před odstraněním savingGoal");

        const deletedSavingGoal = await SavingGoal.findOneAndDelete({ id: id });

        if (!deletedSavingGoal) {
            console.log("Nenalezen savingGoal pro odstranění");
            return res.status(404).json({ message: 'Saving goal not found for the provided id' });
        }

        console.log("SavingGoal byl úspěšně odstraněn");

        res.status(200).json({ message: 'Saving goal deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

   module.exports = router;