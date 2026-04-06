
const express = require("express");
const router = express.Router();
const { getHistoryPage } = require("../controllers/historyController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.get("/", isLoggedIn, getHistoryPage);

module.exports = router;