const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(page = 1, size = 100) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input('page', sql.Int, page)
        .input('size', sql.Int, size)
        .execute("api_getAllMstock_page");
   
    var mstock = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var bc_if = res.recordset[i].bc_if;
        var reg_no = res.recordset[i].reg_no;
        var make = res.recordset[i].make;
        var allc_id = res.recordset[i].allc_id;
        var engine_id = res.recordset[i].engine_id;
        var eserial_no = res.recordset[i].eserial_no;
        var ap_status = res.recordset[i].ap_status;
        var ap_id = res.recordset[i].ap_id;
        var stock_id = res.recordset[i].stock_id;
        var internal_id = res.recordset[i].internal_id;
        var item_id = res.recordset[i].item_id;
        var mgroup_id = res.recordset[i].mgroup_id;
        var fg_id = res.recordset[i].fg_id;
        var quot_id = res.recordset[i].quot_id;
        var ddate = res.recordset[i].ddate;
        var po_id = res.recordset[i].po_id;
        var poi_id = res.recordset[i].poi_id;
        var vendor = res.recordset[i].vendor;
        var status = res.recordset[i].status;
        var so_id = res.recordset[i].so_id;
        var soi_id = res.recordset[i].soi_id;
        var location = res.recordset[i].location;
        var arrivedt = res.recordset[i].arrivedt;
        var acc_arrivedt = res.recordset[i].acc_arrivedt;
        var sir = res.recordset[i].sir;
        var siri = res.recordset[i].siri;
        var grn_id = res.recordset[i].grn_id;
        var grni_id = res.recordset[i].grni_id;
        var job_id = res.recordset[i].job_id;
        var do_id = res.recordset[i].do_id;
        var doi_id = res.recordset[i].doi_id;
        var customer = res.recordset[i].customer;
        var p_status = res.recordset[i].p_status;
        var remark = res.recordset[i].remark;
        var service = res.recordset[i].service;
        var contra = res.recordset[i].contra;
        var obsolete = res.recordset[i].obsolete;
        var com_no = res.recordset[i].com_no;
        var m_reg_no = res.recordset[i].m_reg_no;
        var ccode = res.recordset[i].ccode;
        var corigin_if = res.recordset[i].corigin_if;
        var pcode = res.recordset[i].pcode;
        var porigin_if = res.recordset[i].porigin_if;
        var containercs_id = res.recordset[i].containercs_id;
        var containercb_id = res.recordset[i].containercb_id;
        var inv_no_cs = res.recordset[i].inv_no_cs;
        var inv_no_cb = res.recordset[i].inv_no_cb;
        var picloc1 = res.recordset[i].picloc1;
        var picloc2 = res.recordset[i].picloc2;
        var print_qty = res.recordset[i].print_qty;
        var selectbit = res.recordset[i].selectbit;
        var createby = res.recordset[i].createby;
        var createdt = res.recordset[i].createdt;
        var modifyby = res.recordset[i].modifyby;
        var modifydt = res.recordset[i].modifydt;
        var timemark = res.recordset[i].timemark;
        var identitymark = res.recordset[i].identitymark;
        
        mstock.push({
            'id': id, 
            'bc_if': bc_if,
            'reg_no': reg_no,
            'make': make,
            'allc_id': allc_id,
            'engine_id': engine_id,
            'eserial_no': eserial_no,
            'ap_status': ap_status,
            'ap_id': ap_id,
            'stock_id': stock_id, 
            'internal_id': internal_id,
            'item_id': item_id,
            'mgroup_id': mgroup_id,
            'fg_id': fg_id,
            'quot_id': quot_id,
            'ddate': ddate,
            'po_id': po_id,
            'poi_id': poi_id,
            'vendor': vendor,
            'status': status,
            'so_id': so_id,
            'soi_id': soi_id,
            'location': location,
            'arrivedt': arrivedt,
            'acc_arrivedt': acc_arrivedt,
            'sir': sir,
            'siri': siri,
            'grn_id': grn_id,
            'grni_id': grni_id,
            'job_id': job_id,
            'do_id': do_id,
            'doi_id': doi_id,
            'customer': customer,
            'p_status': p_status,
            'remark': remark,
            'service': service,
            'contra': contra,
            'obsolete': obsolete,
            'com_no': com_no,
            'm_reg_no': m_reg_no,
            'ccode': ccode,
            'corigin_if': corigin_if,
            'pcode': pcode,
            'porigin_if': porigin_if,
            'containercs_id': containercs_id,
            'containercb_id': containercb_id,
            'inv_no_cs': inv_no_cs,
            'inv_no_cb': inv_no_cb,
            'picloc1': picloc1,
            'picloc2': picloc2,
            'print_qty': print_qty,
            'selectbit': selectbit,
            'createby': createby,
            'createdt': createdt,
            'modifyby': modifyby,
            'modifydt': modifydt,
            'timemark': timemark,
            'identitymark': identitymark,
        });
    }
    
    return mstock;
}

async function getById(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input('chassis', id)
        .execute("api_getmstockbychassis");
   
    if (res.recordset.length != 1) {
        throw 'Record not found';
    }
    
    var item = res.recordset[0];
    
    return {
        'id': item.id, 
        'bc_if': item.bc_if,
        'reg_no': item.reg_no,
        'make': item.make,
        'allc_id': item.allc_id,
        'engine_id': item.engine_id,
        'eserial_no': item.eserial_no,
        'ap_status': item.ap_status,
        'ap_id': item.ap_id,
        'stock_id': item.stock_id, 
        'internal_id': item.internal_id,
        'item_id': item.item_id,
        'mgroup_id': item.mgroup_id,
        'fg_id': item.fg_id,
        'quot_id': item.quot_id,
        'ddate': item.ddate,
        'po_id': item.po_id,
        'poi_id': item.poi_id,
        'vendor': item.vendor,
        'status': item.status,
        'so_id': item.so_id,
        'soi_id': item.soi_id,
        'location': item.location,
        'arrivedt': item.arrivedt,
        'acc_arrivedt': item.acc_arrivedt,
        'sir': item.sir,
        'siri': item.siri,
        'grn_id': item.grn_id,
        'grni_id': item.grni_id,
        'job_id': item.job_id,
        'do_id': item.do_id,
        'doi_id': item.doi_id,
        'customer': item.customer,
        'p_status': item.p_status,
        'remark': item.remark,
        'service': item.service,
        'contra': item.contra,
        'obsolete': item.obsolete,
        'com_no': item.com_no,
        'm_reg_no': item.m_reg_no,
        'ccode': item.ccode,
        'corigin_if': item.corigin_if,
        'pcode': item.pcode,
        'porigin_if': item.porigin_if,
        'containercs_id': item.containercs_id,
        'containercb_id': item.containercb_id,
        'inv_no_cs': item.inv_no_cs,
        'inv_no_cb': item.inv_no_cb,
        'picloc1': item.picloc1,
        'picloc2': item.picloc2,
        'print_qty': item.print_qty,
        'selectbit': item.selectbit,
        'createby': item.createby,
        'createdt': item.createdt,
        'modifyby': item.modifyby,
        'modifydt': item.modifydt,
        'timemark': item.timemark,
        'identitymark': item.identitymark,
    };
}

async function create(params) {
    const conn = await db.getConnection();
    const result = await conn.request()
        .input('stock_id', params.stock_id)
        .input('internal_id', params.internal_id)
        .input('item_id', params.item_id)
        .input('mgroup_id', params.mgroup_id)
        .input('fg_id', params.fg_id)
        .input('quot_id', params.quot_id)
        .input('ddate', params.ddate)
        .input('po_id', params.po_id)
        .input('poi_id', params.poi_id)
        .input('vendor', params.vendor)
        .input('status', params.status)
        .execute("api_createmstock");
    return result.recordset[0];
}

async function update(id, params) {
    const conn = await db.getConnection();
    const result = await conn.request()
        .input('id', id)
        .input('stock_id', params.stock_id)
        .input('internal_id', params.internal_id)
        .input('item_id', params.item_id)
        .input('mgroup_id', params.mgroup_id)
        .input('fg_id', params.fg_id)
        .input('quot_id', params.quot_id)
        .input('ddate', params.ddate)
        .input('po_id', params.po_id)
        .input('poi_id', params.poi_id)
        .input('vendor', params.vendor)
        .input('status', params.status)
        .execute("api_updatemstock");
    return result.rowsAffected[0];
}

async function _delete(id) {
    const conn = await db.getConnection();
    const result = await conn.request()
        .input('id', id)
        .execute("api_deletemstock");
    return result.rowsAffected[0];
}