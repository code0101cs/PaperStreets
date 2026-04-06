const express = require("express");
const path = require("path");
const dashboardRoutes = require("./routes/dashboardRoutes");
const backtestRoutes = require("./routes/backtestRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", dashboardRoutes);
app.use("/backtest",backtestRoutes);


module.exports = app;