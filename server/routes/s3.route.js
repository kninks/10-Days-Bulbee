import express from 'express';
const route = express.Router();
import multer from 'multer'

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto';
import sharp from 'sharp';

import { insert_image, get_image } from '../controllers/s3.js';

import dotenv from 'dotenv';
dotenv.config()

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

// const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/'})

route.post('/upload', upload.single('image'), async (req, res) => {
    // console.log('req.body', req.body)
    // console.log('req.file', req.file)
    //resizing
    // const buffer = sharp(req.file.buffer).resize({height: 1080, width: 1080, fit: 'contain'}).toBuffer()

    req.file.buffer
    const imageName = generateFileName();
    const uploadParams = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    // console.log('id', req.body.description)
    // console.log('imagename', imageName)
    
    const data = {
        id: req.body.description,
        image: imageName
    }

    const uploadToMongo = await insert_image(data)

    return uploadToMongo;
})

route.get('/get', async (req, res) => {
    try {
        // console.log('req.query:', req.query)
        const param = req.query.param
        const name = await get_image(param)
        
        const params = {
            Bucket: bucketName,
            Key: name.picture_url
        }
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log('aws_url', url)
    
        return res.json({ url });
    } catch(error) {
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