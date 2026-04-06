
const express = require("express");
const router = express.Router();
const { runBacktest } = require("../controllers/backtestController");

router.post("/", runBacktest);

module.exports = router;