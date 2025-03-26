const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getByStockId
};

async function getByStockId(stock_id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input('chassis_id', sql.VarChar, stock_id)
        .execute("api_getChasissfile");
   
    var chassisfile = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        
        chassisfile.push({
            'id': id
        });
    }
    
    return chassisfile;
} 