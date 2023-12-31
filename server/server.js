require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./middleware/dbConn');
const cors = require('cors');

const app = express();
const port = 4000;

const transactionRouter = require("./routes/transactionRoute")
const overviewRouter = require("./routes/overviewRoute")
const categoryRouter = require("./routes/categoryRoute")
const savingGoalRouter = require ("./routes/savingGoalRoute")
const graphRouter = require ("./routes/graphRoute")
app.use(cors());

// connect to DB
connectDB();
app.get("/info", (req, res) => {
   res.send("working")
});

// transaction router
app.use("/transaction", transactionRouter);

// overview router
app.use("/overview", overviewRouter)

// category router
app.use("/category", categoryRouter)

// graph/get
app.use("/graph", graphRouter);

// savingGoal router
app.use("/savingGoal", savingGoalRouter)



mongoose.connection.once('open', () =>{
    console.log('MongoDb connected');
    app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`)});
});
