import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const server = createServer(app);

app.use(cors())
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

import products_routes from '../server/routes/products.route.js'
import info_routes from '../server/routes/info.route.js'
app.use('/product', products_routes)
app.use('/info', info_routes)

//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "localhost"; 
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});