const express = require('express');
const router = express.Router();
const chassismhService = require('./chassismh.service');

// GET 方法用于获取数据
router.get('/:stock_id', getByStockId);

module.exports = router;

function getByStockId(req, res, next) {
    chassismhService.getByStockId(req.params.stock_id)
        .then(chassismh => chassismh ? res.json(chassismh) : res.sendStatus(404))
        .catch(err => next(err));
} 