const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

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
        var stock_id = res.recordset[i].stock_id;
        var ddate = res.recordset[i].ddate;
        var location = res.recordset[i].location;
        var jobi_id = res.recordset[i].jobi_id;
        var chassism_id = res.recordset[i].chassism_id;
        var movement = res.recordset[i].movement;
        var status = res.recordset[i].status;
        var info1 = res.recordset[i].info1;
        var info2 = res.recordset[i].info2;
        var remark = res.recordset[i].remark;
        var sdo_id = res.recordset[i].sdo_id;
        var after_do = res.recordset[i].after_do;
        var createby = res.recordset[i].createby;
        var createdt = res.recordset[i].createdt;
        var timemark = res.recordset[i].timemark;
        var identitymark = res.recordset[i].identitymark;
        
        chassismh.push({
            'id': id,
            'chassismh_id': chassismh_id,
            'stock_id': stock_id,
            'ddate': ddate,
            'location': location,
            'jobi_id': jobi_id,
            'chassism_id': chassism_id,
            'movement': movement,
            'status': status,
            'info1': info1,
            'info2': info2,
            'remark': remark,
            'sdo_id': sdo_id,
            'after_do': after_do,
            'createby': createby,
            'createdt': createdt,
            'timemark': timemark,
            'identitymark': identitymark
        });
    }
    
    return chassismh;
} 