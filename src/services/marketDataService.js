const axios = require("axios");

const getMarketData = async (symbol, startDate, endDate) => {
  try {
    const start = Math.floor(new Date(startDate).getTime() / 1000);

    // add 1 day because Yahoo's period2 acts like exclusive end
    const end = Math.floor(new Date(endDate).getTime() / 1000) + 86400;

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${start}&period2=${end}&interval=1d`;

    const response = await axios.get(url);

    const result = response.data.chart?.result?.[0];

    if (!result || !result.timestamp || !result.indicators?.quote?.[0]?.close) {
      console.log("No valid market data found");
      return [];
    }

    const timestamps = result.timestamp;
    const closes = result.indicators.quote[0].close;

    const cleanedData = [];

    for (let i = 0; i < timestamps.length; i++) {
      if (closes[i] !== null && closes[i] !== undefined) {
        cleanedData.push({
          date: new Date(timestamps[i] * 1000).toISOString().split("T")[0],
          close: Number(closes[i])
        });
      }
    }

    console.log("Fetched market data length:", cleanedData.length);
    return cleanedData;
  } catch (error) {
    console.log("API Error:", error.message);
    return [];
  }
};

module.exports = { getMarketData };