const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

const users = []

app.get('/', (req, res) => {
    res.send('API connected');
});

app.get('/users', (req, res) => {
    res.json(users)
})

//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "localhost"; 
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});