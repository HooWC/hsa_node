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
        .execute("api_getChasissfile");
   
    var chassisfile = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var pk = res.recordset[i].pk;
        var doctype = res.recordset[i].doctype;
        var cserial_no = res.recordset[i].cserial_no;
        var make = res.recordset[i].make;
        var mgroup_id = res.recordset[i].mgroup_id;
        var engine_id = res.recordset[i].engine_id;
        var axle = res.recordset[i].axle;
        var plan_id = res.recordset[i].plan_id;
        var body_grp = res.recordset[i].body_grp;
        var makei_pk = res.recordset[i].makei_pk;
        var body_type = res.recordset[i].body_type;
        var body_desc = res.recordset[i].body_desc;
        var file_path = res.recordset[i].file_path;
        var file_version = res.recordset[i].file_version;
        var prev_pk = res.recordset[i].prev_pk;
        var file_desc = res.recordset[i].file_desc;
        var createby = res.recordset[i].createby;
        var createdt = res.recordset[i].createdt;
        var modifyby = res.recordset[i].modifyby;
        var modifydt = res.recordset[i].modifydt;
        var status = res.recordset[i].status;
        var timemark = res.recordset[i].timemark;
        var identitymark = res.recordset[i].identitymark;
        
        chassisfile.push({
            'id': id,
            'pk': pk,
            'doctype': doctype,
            'cserial_no': cserial_no,
            'make': make,
            'mgroup_id': mgroup_id,
            'engine_id': engine_id,
            'axle': axle,
            'plan_id': plan_id,
            'body_grp': body_grp,
            'makei_pk': makei_pk,
            'body_type': body_type,
            'body_desc': body_desc,
            'file_path': file_path,
            'file_version': file_version,
            'prev_pk': prev_pk,
            'file_desc': file_desc,
            'createby': createby,
            'createdt': createdt,
            'modifyby': modifyby,
            'modifydt': modifydt,
            'status': status,
            'timemark': timemark,
            'identitymark': identitymark
        });
    }
    
    return chassisfile;
} 