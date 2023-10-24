const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const server = createServer(app);

app.use(cors())
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.send('API connected');
    console.log('API connected')
  });

const products_routes = require('../server/routes/products.route')
app.use('/products', products_routes)

app.post('/submit', (req, res) => {
  const textData = req.body.textData;
  console.log('Discount applied', textData);
  res.json({ message: 'Text data received'})
})

//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "localhost"; 
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});