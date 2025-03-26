const express = require('express');
const router = express.Router();
const chassisfileService = require('./chassisfile.service');

router.post('/:stock_id', getByStockId);

module.exports = router;

function getByStockId(req, res, next) {
    chassisfileService.getByStockId(req.params.stock_id)
        .then(chassisfile => chassisfile ? res.json(chassisfile) : res.sendStatus(404))
        .catch(err => next(err));
} 