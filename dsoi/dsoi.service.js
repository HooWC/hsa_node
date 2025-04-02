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
        .execute("api_getSO");
   
    var dsoi = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var soi_id = res.recordset[i].soi_id;
        var so_id = res.recordset[i].so_id;
        var ddate = res.recordset[i].ddate;
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
        var qty = res.recordset[i].qty;
        var uom = res.recordset[i].uom;
        var guprice = res.recordset[i].guprice;
        var disc_price = res.recordset[i].disc_price;
        var uprice = res.recordset[i].uprice;
        var subtotal = res.recordset[i].subtotal;
        var deliverydt = res.recordset[i].deliverydt;
        var job_id = res.recordset[i].job_id;
        var status = res.recordset[i].status;
        var b_ass = res.recordset[i].b_ass;
        var b_assdt = res.recordset[i].b_assdt;
        var b_assby = res.recordset[i].b_assby;
        var completeby = res.recordset[i].completeby;
        var completedt = res.recordset[i].completedt;
        var fg_complete = res.recordset[i].fg_complete;
        var fg_completeby = res.recordset[i].fg_completeby;
        var fg_completedt = res.recordset[i].fg_completedt;
        var qty_ship = res.recordset[i].qty_ship;
        var qty_bill = res.recordset[i].qty_bill;
        var remark = res.recordset[i].remark;
        var remark2 = res.recordset[i].remark2;
        var oaxle = res.recordset[i].oaxle;
        var owheelbase = res.recordset[i].owheelbase;
        var rebuilt_header = res.recordset[i].rebuilt_header;
        var myear = res.recordset[i].myear;
        var ori_condition = res.recordset[i].ori_condition;
        var condition = res.recordset[i].condition;
        var change_con = res.recordset[i].change_con;
        var application = res.recordset[i].application;
        var startdt = res.recordset[i].startdt;
        var version = res.recordset[i].version;
        var body_grp = res.recordset[i].body_grp;
        var obody_grp = res.recordset[i].obody_grp;
        var fueltype = res.recordset[i].fueltype;
        var reserve = res.recordset[i].reserve;
        var reserveby = res.recordset[i].reserveby;
        var reservedt = res.recordset[i].reservedt;
        var allc_id = res.recordset[i].allc_id;
        var service = res.recordset[i].service;
        var contra = res.recordset[i].contra;
        var ege_status = res.recordset[i].ege_status;
        var ap_status = res.recordset[i].ap_status;
        var transmission = res.recordset[i].transmission;
        var volvo_version = res.recordset[i].volvo_version;
        var bahan_bakar = res.recordset[i].bahan_bakar;
        var dum_type = res.recordset[i].dum_type;
        var enter = res.recordset[i].enter;
        var selectbit = res.recordset[i].selectbit;
        var do_wheelbase = res.recordset[i].do_wheelbase;
        var do_axle = res.recordset[i].do_axle;
        var do_cyear = res.recordset[i].do_cyear;
        var include_cn = res.recordset[i].include_cn;
        var batch_no = res.recordset[i].batch_no;
        var batch_no_pk = res.recordset[i].batch_no_pk;
        var createby = res.recordset[i].createby;
        var createdt = res.recordset[i].createdt;
        var timemark = res.recordset[i].timemark;
        var identitymark = res.recordset[i].identitymark;
        
        dsoi.push({
            'id': id,
            'soi_id': soi_id,
            'so_id': so_id,
            'ddate': ddate,
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
            'qty': qty,
            'uom': uom,
            'guprice': guprice,
            'disc_price': disc_price,
            'uprice': uprice,
            'subtotal': subtotal,
            'deliverydt': deliverydt,
            'job_id': job_id,
            'status': status,
            'b_ass': b_ass,
            'b_assdt': b_assdt,
            'b_assby': b_assby,
            'completeby': completeby,
            'completedt': completedt,
            'fg_complete': fg_complete,
            'fg_completeby': fg_completeby,
            'fg_completedt': fg_completedt,
            'qty_ship': qty_ship,
            'qty_bill': qty_bill,
            'remark': remark,
            'remark2': remark2,
            'oaxle': oaxle,
            'owheelbase': owheelbase,
            'rebuilt_header': rebuilt_header,
            'myear': myear,
            'ori_condition': ori_condition,
            'condition': condition,
            'change_con': change_con,
            'application': application,
            'startdt': startdt,
            'version': version,
            'body_grp': body_grp,
            'obody_grp': obody_grp,
            'fueltype': fueltype,
            'reserve': reserve,
            'reserveby': reserveby,
            'reservedt': reservedt,
            'allc_id': allc_id,
            'service': service,
            'contra': contra,
            'ege_status': ege_status,
            'ap_status': ap_status,
            'transmission': transmission,
            'volvo_version': volvo_version,
            'bahan_bakar': bahan_bakar,
            'dum_type': dum_type,
            'enter': enter,
            'selectbit': selectbit,
            'do_wheelbase': do_wheelbase,
            'do_axle': do_axle,
            'do_cyear': do_cyear,
            'include_cn': include_cn,
            'batch_no': batch_no,
            'batch_no_pk': batch_no_pk,
            'createby': createby,
            'createdt': createdt,
            'timemark': timemark,
            'identitymark': identitymark
        });
    }
    
    return dsoi;
} 