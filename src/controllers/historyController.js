const Backtest = require("../models/backtest");

const getHistoryPage = async (req, res) => {
  try {
    const backtests = await Backtest.find({ user: req.session.user.id })
      .sort({ createdAt: -1 });

    res.render("history", { backtests });
  } catch (error) {
    console.log("History Error:", error);
    res.send("Could not load history");
  }
};

module.exports = { getHistoryPage };