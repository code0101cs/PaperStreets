# Paper Streets

Paper Streets is a web-based trading backtester that lets users test simple trading strategies on historical stock data.

Built as a learning project, it allows users to create an account, run backtests on selected stocks, compare strategy outcomes, and view saved backtest history through a clean dashboard interface.

## Features

- User signup, login, and logout
- Session-based authentication
- Protected dashboard and history routes
- Run backtests using historical stock data
- Supports:
  - Moving Average Crossover strategy
  - Buy and Hold strategy
- Trade log with BUY/SELL entries
- Final portfolio value calculation
- Saved backtest history for each user
- Performance chart on result page
- Dark / Light theme toggle

## Tech Stack

**Frontend**
- EJS
- CSS
- JavaScript
- Chart.js (via CDN)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication / Session**
- bcrypt
- express-session
- connect-mongo

**Other Tools**
- Axios
- dotenv

## How It Works

1. User lands on the home page  
2. User signs up and logs in  
3. User opens the dashboard  
4. User enters:
   - Stock symbol
   - Start date
   - End date
   - Initial capital
   - Strategy
5. App fetches historical stock data  
6. Selected strategy generates BUY/SELL signals  
7. Backtest engine simulates trades  
8. Result page shows:
   - Trade log
   - Final portfolio value
   - Price chart with signals
9. Backtest gets stored in MongoDB  
10. User can view previous runs in History  

## Strategies Implemented

### 1. Moving Average Crossover
- Short MA: 5 days
- Long MA: 20 days
- BUY when short MA crosses above long MA
- SELL when short MA crosses below long MA

### 2. Buy and Hold
- BUY on first available trading day
- SELL on last available trading day

## Project Structure

backend/
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── backtestController.js
    │   └── historyController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── backtest.js
    │   └── user.js
    ├── public/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       └── themeToggle.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── backtestRoutes.js
    │   ├── dashboardRoutes.js
    │   ├── historyRoutes.js
    │   └── homeRoute.js
    ├── services/
    │   ├── backtestService.js
    │   └── marketDataService.js
    ├── strategies/
    │   ├── buyHoldStrategy.js
    │   └── movingAverage.js
    ├── utils/
    │   └── calculations.js
    └── views/
        ├── dashboard.ejs
        ├── history.ejs
        ├── home.ejs
        ├── login.ejs
        ├── result.ejs
        └── signup.ejs