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
        .execute("api_getQuote");
   
    var quote = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var quoti_id = res.recordset[i].quoti_id;
        var quot_id = res.recordset[i].quot_id;
        var valid_fr = res.recordset[i].valid_fr;
        var valid_to = res.recordset[i].valid_to;
        var seq = res.recordset[i].seq;
        var nature = res.recordset[i].nature;
        var item_id = res.recordset[i].item_id;
        var item_desc = res.recordset[i].item_desc;
        var make = res.recordset[i].make;
        var mgroup_id = res.recordset[i].mgroup_id;
        var engine_id = res.recordset[i].engine_id;
        var cc = res.recordset[i].cc;
        var model_id = res.recordset[i].model_id;
        var wheelbase = res.recordset[i].wheelbase;
        var bdm = res.recordset[i].bdm;
        var axle = res.recordset[i].axle;
        var cserial_no = res.recordset[i].cserial_no;
        var eserial_no = res.recordset[i].eserial_no;
        var plan_id = res.recordset[i].plan_id;
        var body_type = res.recordset[i].body_type;
        var cabin_colour = res.recordset[i].cabin_colour;
        var tyre_type = res.recordset[i].tyre_type;
        var cyear = res.recordset[i].cyear;
        var uom = res.recordset[i].uom;
        var guprice = res.recordset[i].guprice;
        var disc_price = res.recordset[i].disc_price;
        var uprice = res.recordset[i].uprice;
        var subtotal = res.recordset[i].subtotal;
        var deliverydt = res.recordset[i].deliverydt;
        var job_id = res.recordset[i].job_id;
        var status = res.recordset[i].status;
        var remark = res.recordset[i].remark;
        var rebuilt_header = res.recordset[i].rebuilt_header;
        var myear = res.recordset[i].myear;
        var condition = res.recordset[i].condition;
        var application = res.recordset[i].application;
        var version = res.recordset[i].version;
        var body_grp = res.recordset[i].body_grp;
        var createby = res.recordset[i].createby;
        var createdt = res.recordset[i].createdt;
        var timemark = res.recordset[i].timemark;
        var identitymark = res.recordset[i].identitymark;
        
        quote.push({
            'id': id,
            'quoti_id': quoti_id,
            'quot_id': quot_id,
            'valid_fr': valid_fr,
            'valid_to': valid_to,
            'seq': seq,
            'nature': nature,
            'item_id': item_id,
            'item_desc': item_desc,
            'make': make,
            'mgroup_id': mgroup_id,
            'engine_id': engine_id,
            'cc': cc,
            'model_id': model_id,
            'wheelbase': wheelbase,
            'bdm': bdm,
            'axle': axle,
            'cserial_no': cserial_no,
            'eserial_no': eserial_no,
            'plan_id': plan_id,
            'body_type': body_type,
            'cabin_colour': cabin_colour,
            'tyre_type': tyre_type,
            'cyear': cyear,
            'uom': uom,
            'guprice': guprice,
            'disc_price': disc_price,
            'uprice': uprice,
            'subtotal': subtotal,
            'deliverydt': deliverydt,
            'job_id': job_id,
            'status': status,
            'remark': remark,
            'rebuilt_header': rebuilt_header,
            'myear': myear,
            'condition': condition,
            'application': application,
            'version': version,
            'body_grp': body_grp,
            'createby': createby,
            'createdt': createdt,
            'timemark': timemark,
            'identitymark': identitymark
        });
    }
    
    return quote;
} 