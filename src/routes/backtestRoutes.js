const express = require("express");
const router = express.Router();
const { runBacktest } = require("../controllers/backtestController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/", isLoggedIn, runBacktest);

module.exports = router;