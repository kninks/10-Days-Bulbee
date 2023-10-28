import express from 'express';
const route = express.Router();
import { insert_discount, discount_code } from '../controllers/info.js'

route.post('/insert', (req, res) => {
    try {
        const _out = insert_discount(req.body)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/submit', (req, res) => {
    try {
        const _out = discount_code(req.body)

        return res.json({ message: 'Text data received'})
    } catch (error) {
        return res.json({ status: false, message: error });
    }
  })

export default route;