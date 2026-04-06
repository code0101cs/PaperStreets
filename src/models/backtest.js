const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    type: String,
    date: String,
    price: Number,
    quantity: Number,
    profitLoss: Number,
    autoClosed: Boolean
  },
  { _id: false }
);

const backtestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    capital: {
      type: Number,
      required: true
    },
    strategy: {
      type: String,
      required: true
    },
    finalPortfolioValue: {
      type: Number,
      required: true
    },
    trades: [tradeSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Backtest", backtestSchema);