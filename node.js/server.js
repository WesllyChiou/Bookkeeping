const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 8080 });

// API URL
const STOCK_API_URL = 'https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL';

async function fetchStockData() {
  try {
    const response = await axios.get(STOCK_API_URL);
    return response.data; // 確保這裡返回的是 JSON 數據
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

// 當客戶端連接到 WebSocket
wss.on('connection', ws => {
  console.log('Client connected');

  // 每 2 秒發送一次最新股市數據
  const interval = setInterval(async () => {
    const stockData = await fetchStockData();
    if (stockData) {
      ws.send(JSON.stringify(stockData)); // 發送 JSON 格式的即時股市數據
    }
  }, 2000);

  // 客戶端斷開時清除間隔
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
