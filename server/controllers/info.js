import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

export async function insert_discount(req) {
    try {
        const database = client.db('usersDB')
        const col = database.collection('info')

        const user = await col.insertOne({ sid: req.sid, discount: ["universal"], bulb: 10000})

        return user
    } catch(error) {
        return { status: false, result: error}
    }
}

export async function discount_code(req) {
    try {
        const database = client.db('usersDB');
        const col = database.collection('info');

        // const idUser = await col.insertOne({discount_code: req.textData})

        const ref = { sid: req.sid }
        const check = { sid: req.sid, discount: req.textData }

        const existed = col.findOne(check)

        if (existed) {
            const discount = await col.updateOne(ref, {$pull: {discount: req.textData}})

            if (discount.modifiedCount === 1) {
                console.log('Discounted Succesfully')
            } else {
                console.log('Failed to discount')
            }
        } else {
            console.log('Discount doesnt existed')
        }
        
        return existed
    } catch(error) {
        return { status: false, result: error}
    }
}


import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import dotenv from 'dotenv'

dotenv.config()

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


export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}