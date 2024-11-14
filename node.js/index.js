// 引入 express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// 允许所有来源跨域请求
app.use(cors());
// 使用 bodyParser 中间件来解析 JSON 数据
app.use(bodyParser.json());

// 模拟用户数据（实际项目中应从数据库获取）
const users = [
  { username: 'testuser', password: 'password123' }
];

// 登录路由
app.post('/login', (req, res) => {
    console.log('Login request received:', req.body); // 确认请求数据是否正确
    const { username, password } = req.body;
  
    if (username === 'testuser' && password === 'password123') {
      console.log('Login successful'); // 确认登录成功
      return res.json({ success: true });
    } else {
      console.log('Login failed'); // 确认登录失败
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
