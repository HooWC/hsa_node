const express = require('express');
const router = express.Router();

const authorize = require('../_middleware/authorize')
const weightCertService = require('./weightCert.service');

// routes
router.get('/', authorize(), getAll);
//router.get('/:id', authorize(), getById);

module.exports = router;

// http://localhost:4200/weightCerts?page=1&size=5&search=a&orderBy=model_id&orderDir=ASC

function getAll(req, res, next) {
    weightCertService.getAll(req.query.page, req.query.size, 
        req.query.search, req.query.orderBy, req.query.orderDir)
        .then(weightCerts => res.json(weightCerts))
        .catch(next);
}

