const express = require('express');
const router = express.Router();
const quoteService = require('./quote.service');

router.get('/:stock_id', getByStockId);

module.exports = router;

function getByStockId(req, res, next) {
    quoteService.getByStockId(req.params.stock_id)
        .then(quote => quote ? res.json(quote) : res.sendStatus(404))
        .catch(err => next(err));
} 