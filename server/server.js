require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./middleware/dbConn');

const app = express();
const port = 3000;

console.log(process.env.DATABASE_URI)

// connect to DB
connectDB();

// transaction/delete
app.delete("transaction/delete", (req, res) => {
    res.status(200).send("Working")
});

// transaction/create
app.post("transaction/create", (req, res) => {
    res.status(200).send("Working")
});

// transaction/edit
app.post("transaction/edit", (req, res) => {
    res.status(200).send("Working")
});

// transaction/list
app.get("transaction/list", (req, res) => {
    res.status(200).send("Working")
});

// overview/get
app.get("overview/get", (req, res) => {
    res.status(200).send("Working")
});

// overview/list
app.get("overview/list", (req, res) => {
    res.status(200).send("Working")
});

// graph/get
app.get("graph/get", (req, res) => {
    res.status(200).send("Working")
});

// savingGoal/edit
app.post("savingGoal/edit", (req, res) => {
    res.status(200).send("Working")
});

// savingGoal/get
app.get("savingGoal/get", (req, res) => {
    res.status(200).send("Working")
});

mongoose.connection.once('open', () =>{
    console.log('MongoDb connected');
    app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`)});
});
