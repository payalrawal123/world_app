const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectionToDb } = require("./config/dbConfig");
const { userRouter } = require("./routes/userRouter");
const { countriRouter } = require("./routes/countries");
const favoriteRouter = require("./routes/favorite");
const historyRouter = require("./routes/history");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("get start run server");
});

app.use("/auth", userRouter);
app.use("/country", countriRouter);
app.use("/favorite", favoriteRouter);
app.use("/history", historyRouter);



// Routes
// app.use("/auth", require("./routes/auth"));
// app.use("/countries", require("./routes/countries"));
// app.use("/favorites", require("./routes/favorites"));
// app.use("/history", require("./routes/history"));

app.listen(PORT, async () => {
    try {
        await connectionToDb();
        console.log("Server is running...");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
});