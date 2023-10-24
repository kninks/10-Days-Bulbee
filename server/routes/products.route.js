const route = require('express').Router();
const { add_product, get_product , get_all_products} = require('../controllers/products')

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
        const param = req.query.param;
        const _out = await get_product(param);

        return res.json(_out)
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

route.get('/get-all', async (req, res) => {
    try {
        const _out = await get_all_products();
        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})


module.exports = route;