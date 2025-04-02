const db = require('../_helpers/db');
const fs = require("fs");

module.exports = {
    getPdfById,
    getAll,
};

async function getPdfById(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
    .input('id', id || 0)    
    .execute("api_getPdfById");

    if (res.recordset.length != 1) {
        throw 'No pdf record is found';
    }

    var pictureLoc = res.recordset[0].picloc;  
    const base64String = fs.readFileSync(pictureLoc, {encoding: 'base64'});

    return {content: base64String};
}

async function getAll(page, size, search, orderBy, orderDir) {
    const conn = await db.getConnection();
    const res = await conn.request()
    .input('page', page || 1)
    .input('size', size || 20)
    .input('search', search || '')
    .input('orderBy', orderBy || 'plan_id')
    .input('orderDir', orderDir || 'ASC')
    .execute("api_getPlansPagination");

    var plan = new Array();

    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var plan_id = res.recordset[i].plan_id;
        var model_id = res.recordset[i].model_id;
        var body_type = res.recordset[i].body_type;
        var picloc = res.recordset[i].picloc;
        var bdm = res.recordset[i].bdm;
        var length = res.recordset[i].length;
        var cabin_type = res.recordset[i].cabin_type;
        var olength = res.recordset[i].olength;
        var owidth = res.recordset[i].owidth;
        var oheight = res.recordset[i].oheight;
        var wheelbase = res.recordset[i].wheelbase;
        var make = res.recordset[i].make;

        plan.push({'id': id, 'plan_id': plan_id, 'model_id': model_id, 'body_type': body_type, 
        'picloc': picloc, 'bdm': bdm,'length': length,'cabin_type': cabin_type,'olength': olength,
        'owidth': owidth,'oheight': oheight, 'wheelbase': wheelbase, 'make': make});
    }

    return plan;
}
