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

  let inPosition = false;

  for (let i = longPeriod - 1; i < priceData.length; i++) {
    const shortMA = getAverage(priceData, i - shortPeriod + 1, i);
    const longMA = getAverage(priceData, i - longPeriod + 1, i);

    if (i === longPeriod - 1) {
      if (shortMA > longMA) {
        signals.push({
          date: priceData[i].date,
          price: priceData[i].close,
          signal: "BUY",
          shortMA,
          longMA
        });
        inPosition = true;
      }
      continue;
    }

    const prevShortMA = getAverage(priceData, i - shortPeriod, i - 1);
    const prevLongMA = getAverage(priceData, i - longPeriod, i - 1);

    if (!inPosition && prevShortMA <= prevLongMA && shortMA > longMA) {
      signals.push({
        date: priceData[i].date,
        price: priceData[i].close,
        signal: "BUY",
        shortMA,
        longMA
      });
      inPosition = true;
    } else if (inPosition && prevShortMA >= prevLongMA && shortMA < longMA) {
      signals.push({
        date: priceData[i].date,
        price: priceData[i].close,
        signal: "SELL",
        shortMA,
        longMA
      });
      inPosition = false;
    }
  }

  return signals;
};

module.exports = { runMovingAverageStrategy };