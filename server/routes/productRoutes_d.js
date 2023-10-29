import express from 'express';
const route = express.Router();

import productController  from '../controllers/productController';

route.get('/products', productController.getProducts);

export default route;