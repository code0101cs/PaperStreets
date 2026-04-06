
const runMovingAverageStrategy = (priceData) => {
  const shortPeriod = 5;
  const longPeriod = 20;
  const signals = [];

  const getAverage = (data, start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += data[i].close;
    }
    return sum / (end - start + 1);
  };

  for (let i = longPeriod - 1; i < priceData.length; i++) {
    const shortMA = getAverage(priceData, i - shortPeriod + 1, i);
    const longMA = getAverage(priceData, i - longPeriod + 1, i);

    const prevShortMA =
      i - 1 >= longPeriod - 1
        ? getAverage(priceData, i - shortPeriod, i - 1)
        : null;

    const prevLongMA =
      i - 1 >= longPeriod - 1
        ? getAverage(priceData, i - longPeriod, i - 1)
        : null;

    if (prevShortMA !== null && prevLongMA !== null) {
      if (prevShortMA <= prevLongMA && shortMA > longMA) {
        signals.push({
          date: priceData[i].date,
          price: priceData[i].close,
          signal: "BUY",
          shortMA,
          longMA
        });
      } else if (prevShortMA >= prevLongMA && shortMA < longMA) {
        signals.push({
          date: priceData[i].date,
          price: priceData[i].close,
          signal: "SELL",
          shortMA,
          longMA
        });
      }
    }
  }

  return signals;
};

module.exports = { runMovingAverageStrategy };