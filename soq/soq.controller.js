const express = require('express');
const router = express.Router();
const soqService = require('./soq.service');

router.post('/:stock_id', getByStockId);

module.exports = router;

function getByStockId(req, res, next) {
    soqService.getByStockId(req.params.stock_id)
        .then(soq => soq ? res.json(soq) : res.sendStatus(404))
        .catch(err => next(err));
} 