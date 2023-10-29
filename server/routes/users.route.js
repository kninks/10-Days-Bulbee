import express from 'express';
const route = express.Router();
import { get_one_user ,get_all_user, register, login } from '../controllers/users.js'

// import { Router } from 'express';
// const route = Router();
// import { get_all_user, register, login } from '../controllers/users.js'

route.get('/get_one', async (req, res) => {
    try {
        const param = req.query.param
        // console.log(param)
        const foundUsers = await get_one_user(param);
        // console.log(foundUsers)
        
        return res.json(foundUsers);
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.get('/get_all_user', async (req,res) => {
    try {
        const foundUsers = await get_all_user();
        console.log("foundUsers");
        console.log(foundUsers);
        return res.json(foundUsers);
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/register', async (req, res) => {
    try {
        const regUser = await register(req);
        return res.json(regUser)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/login', async (req, res) => {
    try {
        const result = await login(req);
        // console.log(result);
        return res.json(result);
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

export default route;
