const express = require('express');
const server = express();

server.use(express.json());


server.use('/', (req, res) => {
    res.send(`<h2>Sprint API boi</h2>`);
});


module.exports = server;
