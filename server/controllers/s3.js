import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

export async function insert_image(req) {
    try {
        const database = client.db('productsDB')
        const col = database.collection('product')

        const ref = { id: req.id }
        const existed = col.findOne(ref)

        if (existed) {
            const addImage = await col.updateOne(ref, { $set: { picture_url: req.image } })
            
            if (addImage.modifiedCount === 1) {
                console.log('Added Succesfully')
            } else {
                console.log('Failed to add')
            }
        } else {
            console.log('Product doesnt exist')
        }

        return addImage;
    } catch (error) {
        return { status: false, result: error }
    }
}

export async function get_image(req) {
    try {
        const database = client.db('productsDB')
        const col = database.collection('product')

        const ref = { id: req.id }
        const doc = col.findOne(ref)

        if (doc && doc.image) {
            return { image: doc.image }; 
        } else {
            throw new Error("Image not found or invalid data in the database.");
        }
    } catch (error) {
        return { status: false, result: error }
    }
}