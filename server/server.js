require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./middleware/dbConn');

const app = express();
const port = 3000;

const transactionRouter = require("./routes/transactionRoute")
const overviewRouter = require("./routes/overviewRoute")

// connect to DB
connectDB();
app.get("/info", (req, res) => {
   res.send("working")
});

// transaction router
app.use("/transaction", transactionRouter);

// overview router
app.use("/overview", overviewRouter)

// graph/get
app.get("/graph/get", (req, res) => {
    res.status(200).send("Working")
});

// savingGoal/edit
app.post("/savingGoal/edit", (req, res) => {
    res.status(200).send("Working")
});

// savingGoal/get
app.get("/savingGoal/get", (req, res) => {
    res.status(200).send("Working")
});

mongoose.connection.once('open', () =>{
    console.log('MongoDb connected');
    app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`)});
});
