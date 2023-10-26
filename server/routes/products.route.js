import express from 'express';
const route = express.Router();
import { add_product, get_product } from '../controllers/products.js';

route.post('/add', async (req, res) => {
    try {
        const _out = await add_product(req.body);
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

route.get('/get', async (req, res) => {
    try {
        console.log(req.body)
        const param = req.query.param;
        const _out = await get_product(param);

        return res.json(_out)
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

export default route;