import express from 'express';
const route = express.Router();
import multer from 'multer'
import fs from 'fs';

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto';

import { add_product, get_product, get_all_products, get_products_by_category, update_quantity } from '../controllers/products.js'

import dotenv from 'dotenv';
dotenv.config()

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

route.post('/upload', upload.single('image'), async (req, res) => {
    // console.log('req.body', req.body)
    // console.log('req.file', req.file)
    // console.log(req.file.buffer)
    // console.log(req.file.mimetype)
    //resizing
    // const buffer = sharp(req.file.buffer).resize({height: 1080, width: 1080, fit: 'contain'}).toBuffer()

    try {
        const imageName = generateFileName();
       
        const uploadParams = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(uploadParams);

        const uploadResponse = await s3.send(command);

        console.log('Upload successful');

    // console.log('id', req.body.description)
    // console.log('imagename', imageName)
    
        const productData = {
            name: req.body.product,
            description: req.body.description,
            category: req.body.category,
            quantity: req.body.quantity,
            bulb_price: req.body.bulb_price,
            picture_url: imageName
        }

        const uploadToMongo = await add_product(productData)
        // console.log('uploadtomongo', uploadToMongo)

        return res.json(uploadToMongo)
    } catch (error) {
        return res.json({ status: false, result: error})
    }
})

route.get('/get', async (req, res) => {
    try {
        // console.log('req.query:', req.query)
        const param = req.query.param
        const product = await get_product(param)
        // console.log('product', product)
        
        const params = {
            Bucket: bucketName,
            Key: product.picture_url
        }

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        // console.log('aws_url', url)

        product.picture_url = url
        // console.log(product)
    
        return res.json(product);
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

route.get('/get-all', async (req, res) => {
    try {
        const _out = await get_all_products();

        for (const product of _out) {
            const params = {
                Bucket: bucketName,
                Key: product.picture_url
            }
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            // console.log('aws_url', url)
    
            product.picture_url = url
        }
        // console.log(_out)

        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

route.get('/get-by-category', async (req, res) => {
    try {
        const category = req.query.category;
        console.log(category);
        const _out = await get_products_by_category(category);

        for (const product of _out) {
            const params = {
                Bucket: bucketName,
                Key: product.picture_url
            }
    
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            // console.log('aws_url', url)
    
            product.picture_url = url
        }

        // console.log(_out)

        return res.json(_out);
    } catch(error) {
        return res.json({ status: false, message: error });
    }
})

route.post('/update_quantity', async(req, res) => {
    try {
        const _out = await update_quantity(req.body)
        // console.log('body', req.body)
        // console.log('out', _out)

        return res.json(_out)
    } catch (error) {
        return res.json({ status: false, message: error });
    }
})

// app.delete("/api/posts/:id", async (req, res) => {
//   const id = +req.params.id
//   const post = await prisma.posts.findUnique({where: {id}}) 

//   await deleteFile(post.imageName)

//   await prisma.posts.delete({where: {id: post.id}})
//   res.send(post)
// })

// export function deleteFile(fileName) {
//     const deleteParams = {
//       Bucket: bucketName,
//       Key: fileName,
//     }
  
//     return s3Client.send(new DeleteObjectCommand(deleteParams));
//   }


export default route;
