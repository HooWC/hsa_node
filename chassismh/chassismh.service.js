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
        .input('chassis', sql.VarChar, stock_id)
        .execute("api_getMchassismh");
   
    var chassismh = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var chassismh_id = res.recordset[i].chassismh_id;
        
        chassismh.push({
            'id': id,
            'chassismh_id': chassismh_id
        });
    }
    
    return chassismh;
} 