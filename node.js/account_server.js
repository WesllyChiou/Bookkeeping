const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// 設定 Express 應用程式
const app = express();
const PORT = process.env.PORT || 3000;

// 這段中間件會在所有請求進來時記錄請求信息
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// 使用 morgan 輸出 HTTP 請求的詳細日誌
const morgan = require('morgan');
app.use(morgan('dev'));

// 允許跨域請求
app.use(cors({
  origin: 'https://bookkeeping-1.onrender.com', // 只允許此域名的請求
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 解析 JSON 請求
app.use(bodyParser.json());

// MongoDB Atlas 連接 URI
const mongoURI = "mongodb+srv://leweivictory:NOxXkux7mjFvXetz@cluster0.sti8h.mongodb.net/WesleyTest?retryWrites=true&w=majority&appName=Cluster0";

// 連接到 MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Atlas connected successfully');

    // 定義 Expense schema
    const expenseSchema = new mongoose.Schema({
      amount: Number,
      description: String,
      category: String,
      createdAt: { type: Date, default: Date.now },
    });

    const Expense = mongoose.model('Expense', expenseSchema);

    // 添加一筆花費
    app.post('/expenses', async (req, res) => {
      const { amount, description, category } = req.body;

      try {
        const newExpense = new Expense({ amount, description, category });
        await newExpense.save();
        res.status(201).send('花費已添加');
      } catch (error) {
        res.status(400).send('新增花費失敗');
      }
    });

    // 獲取今日的花費總額和清單
    app.get('/expenses/daily', async (req, res) => {
      console.log('路由 /expenses/daily 被訪問'); // 這行日誌確認路由是否觸發
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      try {
        console.log('查詢範圍:', startOfDay, endOfDay);  // 打印查詢的時間範圍
        const dailyExpenses = await Expense.find({
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        const dailyTotal = dailyExpenses.reduce((total, expense) => total + expense.amount, 0);

        res.json({ dailyTotal, dailyExpenses });
      } catch (error) {
        console.error('錯誤:', error);  // 打印錯誤到日誌
        res.status(400).json({ message: '獲取今日花費資料失敗', error: error.message });
      }
    });

    // 獲取本月的花費總額和清單
    app.get('/expenses/monthly', async (req, res) => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

      try {
        const monthlyExpenses = await Expense.find({
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        });
        const monthlyTotal = monthlyExpenses.reduce((total, expense) => total + expense.amount, 0);

        res.json({ monthlyTotal, monthlyExpenses });
      } catch (error) {
        res.status(400).send('獲取本月花費資料失敗');
      }
    });

    // 今日花費清單
    app.get('/expenses/daily-list', async (req, res) => {
      const today = new Date().toISOString().split('T')[0]; // 只取日期部分
      const startOfDay = new Date(today + 'T00:00:00Z');
      const endOfDay = new Date(today + 'T23:59:59Z');
      
      try {
        const dailyExpenses = await Expense.find({
          createdAt: { $gte: startOfDay, $lt: endOfDay }
        });
        res.json({ expenses: dailyExpenses });
      } catch (error) {
        res.status(400).send('獲取今日花費資料失敗');
      }
    });

    // 本月花費清單
    app.get('/expenses/monthly-list', async (req, res) => {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59);
    
      try {
        const monthlyExpenses = await Expense.find({
          createdAt: { $gte: startOfMonth, $lt: endOfMonth }
        });
        res.json({ expenses: monthlyExpenses });
      } catch (error) {
        res.status(400).send('獲取本月花費資料失敗');
      }
    });

    // 啟動伺服器
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
