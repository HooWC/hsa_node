const express = require('express');
const router = express.Router();
const dsoiService = require('./dsoi.service');

router.get('/:stock_id', getByStockId);

module.exports = router;

function getByStockId(req, res, next) {
    dsoiService.getByStockId(req.params.stock_id)
        .then(dsoi => dsoi ? res.json(dsoi) : res.sendStatus(404))
        .catch(err => next(err));
} 