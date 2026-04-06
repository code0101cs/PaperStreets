
const runBuyHoldStrategy = (priceData) => {
  if (!priceData || priceData.length === 0) {
    return [];
  }

  const firstDay = priceData[0];
  const lastDay = priceData[priceData.length - 1];

  return [
    {
      date: firstDay.date,
      price: firstDay.close,
      signal: "BUY"
    },
    {
      date: lastDay.date,
      price: lastDay.close,
      signal: "SELL"
    }
  ];
};

module.exports = { runBuyHoldStrategy };