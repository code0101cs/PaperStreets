const { getMarketData } = require("../services/marketDataService");
const { runMovingAverageStrategy } = require("../strategies/movingAverage");
const { runBuyHoldStrategy } = require("../strategies/buyHoldStrategy");
const { runBacktestEngine } = require("../services/backtestService");
const Backtest = require("../models/backtest");

const runBacktest = async (req, res) => {
  try {
    const { symbol, startDate, endDate, capital, strategy } = req.body;

    const priceData = await getMarketData(symbol, startDate, endDate);

    let signals = [];

    if (strategy === "moving-average") {
      signals = runMovingAverageStrategy(priceData);
    } else if (strategy === "buy-hold") {
      signals = runBuyHoldStrategy(priceData);
    }

    const results = runBacktestEngine(priceData, signals, capital);

    await Backtest.create({
      user: req.session.user.id,
      symbol,
      startDate,
      endDate,
      capital: Number(capital),
      strategy,
      finalPortfolioValue: results.finalPortfolioValue,
      trades: results.trades
    });

    res.render("result", {
      result: {
        symbol,
        startDate,
        endDate,
        capital,
        strategy,
        signals,
        results,
        priceData
      }
    });
  } catch (error) {
    console.log("Backtest Error:", error);
    res.send("Something went wrong");
  }
};

module.exports = { runBacktest };