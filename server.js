const express = require('express');
const path = require('path');

const server = express();

server.use(express.static('build'));

server.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './build/index.html'));
});

server.listen(3030, () => {
    console.log('Server running at http://localhost:3030/.');
});
