const express = require('express');
const Projects = require('./projects-model')
const router = express.Router();
const { logger, validateProjectId, validateProject } = require('./projects-middleware.js');

router.get('/', logger, (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

router.get('/:id', logger, validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', logger, validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next);
});

router.put('/:id', logger, validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

router.delete('/:id', logger, validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(200).json({
            message: "project deleted"
        })
    } catch (err) {
        next(err);
    }
});

router.get('/:id/actions', logger, validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
});

module.exports = router;
