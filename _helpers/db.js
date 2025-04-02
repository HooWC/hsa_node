const mssql = require('mssql');

const { dbName, dbConfig } = require('../config.json');
const host = dbConfig.server;
const { userName, password } = dbConfig.authentication.options;

const sqlConfig = {
    user: userName,
    password: password,
    database: dbName,
    server: host,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,  // 关闭加密
        trustServerCertificate: true,  // 信任自签名证书
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1.2'  // 更新为TLSv1.2
        }
    },
};

class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect(sqlConfig);
    }
    catch(error) {
      console.log(error);
      throw error;  // 抛出错误以便更好地调试
    }
  }
}
module.exports = new DBConnection();