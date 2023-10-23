const route = require('express').Router();
const { add_product, get_product } = require('../controllers/products')
const { get_user } = require('../controllers/users')

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

route.get('/get_user', async (req,res) => {
    try {
        const user = req
        const foundUser = get_user()
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

module.exports = route;