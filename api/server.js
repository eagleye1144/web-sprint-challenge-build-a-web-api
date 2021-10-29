const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
server.use(express.json());

server.use('/api/projects', projectsRouter);

server.use('/', (req, res) => {
    res.send(`<h2>Sprint API boi</h2>`);
});


module.exports = server;
