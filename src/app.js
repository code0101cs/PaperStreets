const express = require("express");
const path = require("path");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const dashboardRoutes = require("./routes/dashboardRoutes");
const backtestRoutes = require("./routes/backtestRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const homeRoutes = require("./routes/homeRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes); 
app.use(authRoutes);
app.use("/", dashboardRoutes);
app.use("/backtest", backtestRoutes);
app.use("/history", historyRoutes);
console.log("MONGO_URI:", process.env.MONGO_URI);
module.exports = app;