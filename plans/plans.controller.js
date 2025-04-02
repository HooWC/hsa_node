const express = require('express');
const router = express.Router();

const authorize = require('../_middleware/authorize')
const planService = require('./plan.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getPdfById);
//router.get('/:id', authorize(), getById);

module.exports = router;

function getPdfById(req, res, next) {
    planService.getPdfById(req.params.id)
        .then(plan => res.json(plan))
        .catch(next);
}

function getAll(req, res, next) {
    planService.getAll(req.query.page, req.query.size, 
        req.query.search, req.query.orderBy, req.query.orderDir)
        .then(plan => res.json(plan))
        .catch(next);
}
