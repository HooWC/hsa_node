require('rootpath')(); // 让 require() 可以使用相对路径，避免使用 ../../../ 这种复杂路径
const cors = require('cors'); // 允许跨域访问
const express = require('express'); // 引入 Express 框架
const http = require("http"); // HTTP 服务器
const app = express(); // 创建 Express 应用实例

const errorHandler = require('_middleware/error-handler'); // 引入全局错误处理中间件

// 配置 Express 解析 JSON 和 URL 编码请求
app.use(express.json()); // 解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码格式的请求体
app.use(cors()); // 允许跨域请求

// 添加请求日志中间件（帮助调试）
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 注册 API 路由
app.use('/users', require('./users/users.controller')); // 处理 /users 相关 API
app.use('/weightCerts', require('./weightCerts/weightCerts.controller')); // 处理 /weightCerts 相关 API
app.use('/plans', require('./plans/plans.controller')); // 处理 /plans 相关 API

// 全局错误处理
app.use(errorHandler);

// 添加未找到路由的处理
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// 设定 HTTP 服务器端口
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3000) : 5000; // HTTP 端口

// 启动 HTTP 服务器
http.createServer(app).listen(port, () => 
    console.log('API server running on http://localhost:' + port)
);
