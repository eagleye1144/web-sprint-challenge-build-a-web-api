const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
server.use(express.json());


server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        note: `server not working correctly`, 
        message: err.message,
        stack: err.stack,
    });
});
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use('/', (req, res) => {
    res.send(`<h2>Sprint API boi</h2>`);
});


module.exports = server;
