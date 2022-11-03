const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

//routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const groupRoute = require("./routes/groupRoute");
const linkRoute = require("./routes/linkRoute");

//initialize express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//initilize port
const port = process.env.PORT || 4000;

//connect to db
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB!");
});

//expose route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/group", groupRoute);
app.use("/link", linkRoute);

//listen to a port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
