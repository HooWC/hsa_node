
require('rootpath')(); // 让 require() 可以使用相对路径，避免使用 ../../../ 这种复杂路径
const cors = require('cors'); // 允许跨域访问
const express = require('express'); // 引入 Express 框架
const https = require("https"); // HTTPS 服务器
const http = require("http"); // HTTP 服务器
const fs = require("fs"); // 处理文件系统
const app = express(); // 创建 Express 应用实例

const errorHandler = require('_middleware/error-handler'); // 引入全局错误处理中间件

// 配置 Express 解析 JSON 和 URL 编码请求
app.use(express.json()); // 解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码格式的请求体
app.use(cors()); // 允许跨域请求

// For testing api
app.get('/', (req, res) => {
  res.status(200).json('Welcome, HSAHQ new version');
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well 123456');
});

app.use('/users', require('./users/users.controller')); // 处理 /users 相关 API
app.use('/weightCerts', require('./weightCerts/weightCerts.controller')); // 处理 /weightCerts 相关 API
app.use('/plans', require('./plans/plans.controller')); // 处理 /plans 相关 API
app.use('/cmh', require('./cmh/cmh.controller')); // 添加 CMH 路由
app.use('/chassismh', require('./chassismh/chassismh.controller'));
app.use('/dsoi', require('./dsoi/dsoi.controller'));
app.use('/quote', require('./quote/quote.controller'));
app.use('/chassisfile', require('./chassisfile/chassisfile.controller'));

// 全局错误处理
app.use(errorHandler);

// 配置 HTTPS 证书
const options = {
    key: fs.readFileSync("hsa-key.key"), // 读取私钥文件
    cert: fs.readFileSync("hongsenghq_ddns_net.pem"), // 读取 SSL 证书文件
    passphrase: "hsonlinehsgroup1234%" // 证书解密密码
};

// 设定 HTTP 和 HTTPS 服务器端口
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4200; // HTTP 端口
const port_ssl = process.env.NODE_ENV === 'production' ? (process.env.PORT || 443) : 4201; // HTTPS 端口

// 启动 HTTP 服务器
http.createServer(options, app).listen(port, () => 
    console.log('Server listening on port ' + port)
);

// 启动 HTTPS 服务器
https.createServer(options, app).listen(port_ssl, () => 
    console.log('Server listening on port ' + port_ssl)
); 