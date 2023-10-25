import express from 'express';
const route = express.Router();
import multer from 'multer';
import fs from 'fs'
import { add_product, get_product, saveImageToMongoDB } from '../controllers/products.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

route.post('/upload', upload.single('image'), async (req, res) => {
    // const imagePath = "C:\Users\User\Downloads\B0059009.png"
    // const imageBuffer = fs.readFileSync(imagePath)
    const imageBuffer = req.file.buffer;

    try {
        const insertedId = await saveImageToMongoDB(req.app.locals.mongoClient, imageBuffer);
        res.json({ message: 'Image uploaded successfully', imageId: insertedId });
    } catch(error) {
        res.json({ status: false, message: error });
    }
})

export default route;