const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
        username: Joi.string().required(),                
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().empty(''),
        role: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}

//====

/* const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/authenticate', async (req, res) => {
    try {
        res.json(await userService.authenticate(req.body));
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.post('/register', async (req, res) => {
    try {
        await userService.create(req.body);
        res.json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        res.json(await userService.getAll());
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await userService.getById(req.params.id));
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await userService.update(req.params.id, req.body);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userService.delete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router; */
