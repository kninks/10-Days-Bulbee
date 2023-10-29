import express from 'express';
const route = express.Router();
import { verifyJWT, get_user ,get_all_user, register, login, logout } from '../controllers/users.js'

route.get('/get_one', verifyJWT, async (req, res) => {
    try {
        const foundUsers = await get_user(req.body.id);
        console.log(foundUsers)
        
        return res.json(foundUsers);
    } catch (error) {
        return res.json({ status: false, result: error });
    }
})

route.get('/get_all_user', async (req,res) => {
    try {
        const foundUsers = await get_all_user();
        console.log("foundUsers");
        console.log(foundUsers);
        return res.json(foundUsers);
    } catch (error) {
        return res.json({ status: false, result: error });
    }
})

route.post('/register', async (req, res) => {
    try {
        const regUser = await register(req);
        return res.json(regUser)
    } catch (error) {
        return res.json({ status: false, result: error });
    }
})

route.post('/login', async (req, res) => {
    try {
        const result = await login(req, res);
        // console.log(result);
        return res.json(result);
    } catch (error) {
        return res.json({ status: false, result: error });
    }
})

route.post('/logout', async (req, res) => {
    try {
        const result = await logout(req, res);
        // console.log(result);
        return res.json(result);
    } catch (error) {
        return res.json({ status: false, result: error });
    }
})

export default route;
