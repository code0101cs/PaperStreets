const { getMarketData } = require("../services/marketDataService");
const { runMovingAverageStrategy } = require("../strategies/movingAverage");

const runBacktest = async (req, res) => {
  const { symbol, startDate, endDate, capital, strategy } = req.body;

  const priceData = await getMarketData(symbol, startDate, endDate);

  let signals = [];

  if (strategy === "moving-average") {
    signals = runMovingAverageStrategy(priceData);
  }

  res.json({
    symbol,
    startDate,
    endDate,
    capital,
    strategy,
    signals
  });
};

module.exports = { runBacktest };