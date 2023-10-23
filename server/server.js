const express = require('express');
const { createServer } = require('http');//edited from const { createServer } = require('node/http');
const cors = require('cors');

const app = express();
const server = createServer(app);

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.send('API connected');
    console.log('API connected')
  });

// const products_routes = require('./routes/products.route')

// app.use('/products', products_routes)

//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "localhost"; 
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});