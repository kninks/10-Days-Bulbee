// const express = require('express');
// const { createServer } = require('node:http');
// const cors = require('cors');

import express from "express";
import { createServer } from 'http';
import cors from 'cors';


const app = express();
const server = createServer(app);

app.use(express.json()) 
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});

app.get('/', (req, res) => {
    res.send('API connected');
});

const users_routes = require('../server/routes/users.route')

app.use('/auth', users_routes)

//Run Server -------------------------------------------------
const PORT = 4001; 
const SERVER_IP = "127.0.0.1"; 
server.listen(PORT, SERVER_IP, () => {
    console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});