const { getMarketData } = require("../services/marketDataService");
const { runMovingAverageStrategy } = require("../strategies/movingAverage");
const { runBuyHoldStrategy } = require("../strategies/buyHoldStrategy");
const { runBacktestEngine } = require("../services/backtestService");

const runBacktest = async (req, res) => {
  const { symbol, startDate, endDate, capital, strategy } = req.body;

  const priceData = await getMarketData(symbol, startDate, endDate);

  let signals = [];

  if (strategy === "moving-average") {
    signals = runMovingAverageStrategy(priceData);
  } else if (strategy === "buy-hold") {
    signals = runBuyHoldStrategy(priceData);
  }

    const results = runBacktestEngine(priceData, signals, capital);

  res.json({
    symbol,
    startDate,
    endDate,
    capital,
    strategy,
    signals,
    results
  });
};

module.exports = { runBacktest };