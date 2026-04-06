const runBacktestEngine = (priceData, signals, initialCapital) => {
  let cash = Number(initialCapital);
  let quantity = 0;
  let buyPrice = 0;

  const trades = [];

  for (const signalObj of signals) {
    const { date, price, signal } = signalObj;

    if (signal === "BUY" && cash > 0) {
      quantity = Math.floor(cash / price);

      if (quantity > 0) {
        buyPrice = price;
        cash = cash - quantity * price;

        trades.push({
          type: "BUY",
          date,
          price,
          quantity
        });
      }
    }

    else if (signal === "SELL" && quantity > 0) {
      const sellValue = quantity * price;
      const profitLoss = (price - buyPrice) * quantity;

      cash = cash + sellValue;

      trades.push({
        type: "SELL",
        date,
        price,
        quantity,
        profitLoss
      });

      quantity = 0;
      buyPrice = 0;
    }
  }

  if (quantity > 0 && priceData.length > 0) {
    const lastDay = priceData[priceData.length - 1];
    const sellValue = quantity * lastDay.close;
    const profitLoss = (lastDay.close - buyPrice) * quantity;

    cash = cash + sellValue;

    trades.push({
      type: "SELL",
      date: lastDay.date,
      price: lastDay.close,
      quantity,
      profitLoss,
      autoClosed: true
    });

    quantity = 0;
    buyPrice = 0;
  }

  return {
    initialCapital: Number(initialCapital),
    finalPortfolioValue: cash,
    remainingCash: cash,
    remainingQuantity: quantity,
    trades
  };
};

module.exports = { runBacktestEngine };