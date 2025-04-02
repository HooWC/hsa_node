const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = {
    getAll
};

async function getAll(page, size, search, orderBy, orderDir) {
    const conn = await db.getConnection();
    const res = await conn.request()
    .input('page', page || 1)
    .input('size', size || 20)
    .input('search', search || '')
    .input('orderBy', orderBy || 'model_id')
    .input('orderDir', orderDir || 'ASC')
    .execute("api_getWeightCertsPagination");
   
    var weightCert = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var model_id = res.recordset[i].model_id;
        var mgroup_id = res.recordset[i].mgroup_id;   
        var make = res.recordset[i].make;         
        var model_code = res.recordset[i].model_code;
        var item_id = res.recordset[i].item_id;
        var rujukan = res.recordset[i].rujukan;
        var comtype_id = res.recordset[i].comtype_id;
        var cabin_type = res.recordset[i].cabin_type;
        var ddate = res.recordset[i].ddate;
        var engine_id = res.recordset[i].engine_id;
        var engine_if = res.recordset[i].engine_if;
        var cc = res.recordset[i].cc;
        var power = res.recordset[i].power;
        var torque = res.recordset[i].torque;
        var fueltype = res.recordset[i].fueltype;
        var axle = res.recordset[i].axle;
        var wheelbase = res.recordset[i].wheelbase;
        var tw_front = res.recordset[i].tw_front;
        var tw_rear = res.recordset[i].tw_rear;
        var olength = res.recordset[i].olength;
        var owidth = res.recordset[i].owidth;
        var oheight = res.recordset[i].oheight;
        var oh_front = res.recordset[i].oh_front;
        var oh_rear = res.recordset[i].oh_rear;
        var oh_rear = res.recordset[i].oh_rear;
        var bdm_w = res.recordset[i].bdm_w;
        var bdm_e = res.recordset[i].bdm_e;
        var tyre_width = res.recordset[i].tyre_width;
        var tyre_rim = res.recordset[i].tyre_rim;
        var tyre_ply = res.recordset[i].tyre_ply;
        var tyre_front = res.recordset[i].tyre_front;
        var tyre_back = res.recordset[i].tyre_back;
        var wheel_front = res.recordset[i].wheel_front;
        var wheel_rear = res.recordset[i].wheel_rear;
        var tyre_option = res.recordset[i].tyre_option;
        var g_front = res.recordset[i].g_front;
        var g_rear = res.recordset[i].g_rear;
        var gvw = res.recordset[i].gvw;

        weightCert.push({'id': id, 'model_id': model_id, 'mgroup_id': mgroup_id, 'make': make, 'model_code': model_code, 
                    'item_id': item_id, 'rujukan': rujukan, 'comtype_id': comtype_id,
                    'cabin_type': cabin_type, 'ddate': ddate, 'engine_id': engine_id, 'engine_if': engine_if,
                'cc': cc, 'power': power, 'torque': torque, 'fueltype': fueltype, 'axle': axle,
                'wheelbase': wheelbase, 'tw_front': tw_front, 'tw_rear': tw_rear, 'olength': olength,
                'owidth': owidth, 'oheight': oheight, 'oh_front': oh_front, 'oh_rear': oh_rear,'bdm_w': bdm_w,
                'bdm_e': bdm_e, 'tyre_width': tyre_width, 'tyre_rim': tyre_rim, 'tyre_ply': tyre_ply,'tyre_front': tyre_front,
                'tyre_back': tyre_back, 'wheel_front': wheel_front, 'wheel_rear': wheel_rear, 'tyre_option': tyre_option,
                'g_front': g_front,'g_rear': g_rear, 'gvw': gvw});
    }
    
    return weightCert;
}
