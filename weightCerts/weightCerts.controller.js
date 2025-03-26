const express = require('express');
const router = express.Router();

const authorize = require('_middleware/authorize')
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

//====

// weightCerts.controller.js (简化版)
/* const express = require('express');
const router = express.Router();
const weightCertService = require('./weightCert.service');

router.get('/', async (req, res) => {
    try {
        const { page, size, search, orderBy, orderDir } = req.query;
        const weightCerts = await weightCertService.getAll(page, size, search, orderBy, orderDir);
        res.json(weightCerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; */

