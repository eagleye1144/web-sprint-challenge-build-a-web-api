
const express = require('express');
const Actions = require('./actions-model');
const { logger, validateActionId, validateAction } = require('./actions-middlware');

const router = express.Router();


router.get('/', logger, (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})


router.get('/:id', logger, validateActionId, (req, res) => {
    res.status(200).json(req.action);
});


router.post('/', logger, validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next);
});


router.put('/:id', logger, validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});


router.delete('/:id', logger, validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.status(200).json({
            message: "action deleted"
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router; 
