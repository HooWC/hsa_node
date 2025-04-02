/* 
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
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3000) : 5000; // HTTP 端口
const port_ssl = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3443) : 5001; // HTTPS 端口

// 启动 HTTP 服务器
http.createServer(options, app).listen(port, () => 
    console.log('Server listening on port ' + port)
);

// 启动 HTTPS 服务器
https.createServer(options, app).listen(port_ssl, () => 
    console.log('Server listening on port ' + port_ssl)
);  */

require('rootpath')(); // 让 require() 可以使用相对路径，避免使用 ../../../ 这种复杂路径
const cors = require('cors'); // 允许跨域访问
const express = require('express'); // 引入 Express 框架
const Joi = require('joi');
const app = express(); // 创建 Express 应用实例

const validateRequest = require('./_middleware/validate-request');
const authorize = require('./_middleware/authorize')

const errorHandler = require('./_middleware/error-handler'); // 引入全局错误处理中间件
const userService = require('./users/user.service'); // 引入 userService

// 配置 Express 解析 JSON 和 URL 编码请求
app.use(express.json()); // 解析 JSON 格式的请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码格式的请求体
app.use(cors()); // 允许跨域请求

// For testing api
app.get('/', (req, res) => {
  res.status(200).json('Welcome, Hoo');
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

// 用户相关的 API
app.post('/users/authenticate', authenticateSchema, authenticate);
app.post('/users/register', registerSchema, register);
app.get('/users', authorize(), getAll);
app.get('/users/current', authorize(), getCurrent);
app.get('/users/:id', authorize(), getById);
app.put('/users/:id', authorize(), updateSchema, update);
app.delete('/users/:id', authorize(), _delete);

// 全局错误处理
app.use(errorHandler);

// 启动 HTTP 服务
const port = process.env.PORT || 3000;  // 使用 Vercel 提供的端口
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 认证 Schema
function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

// 认证处理
function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next);
}

// 注册 Schema
function registerSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
  });
  validateRequest(req, next, schema);
}

// 注册处理
function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next);
}

// 获取所有用户
function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

// 获取当前用户
function getCurrent(req, res, next) {
  res.json(req.user);
}

// 根据 ID 获取用户
function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

// 更新用户 Schema
function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(''),
    firstName: Joi.string().empty(''),
    lastName: Joi.string().empty(''),
    email: Joi.string().empty(''),
    role: Joi.string().empty(''),
    username: Joi.string().empty(''),
    password: Joi.string().min(6).empty('')
  });
  validateRequest(req, next, schema);
}

// 更新用户处理
function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next);
}

// 删除用户处理
function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next);
}
