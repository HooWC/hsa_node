const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const cmhService = require('./cmh.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// http://localhost:5000/cmh?page=1&size=5&search=a&orderBy=stock_id&orderDir=ASC
function getAll(req, res, next) {
    cmhService.getAll()
        .then(mstock => res.json(mstock))
        .catch(next);
}

function getById(req, res, next) {
    cmhService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    cmhService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    cmhService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    cmhService.delete(req.params.id)
        .then(() => res.json({ message: 'Record deleted successfully' }))
        .catch(next);
} 