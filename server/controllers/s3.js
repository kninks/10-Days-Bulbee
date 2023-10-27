import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

export async function get_image(req) {
    try {
        const database = client.db('productsDB')
        const col = database.collection('product')

        const ref = { id: req }
        const doc = await col.findOne(ref)
        console.log('img_url', doc.picture_url)

        return { picture_url: doc.picture_url }; 
    } catch (error) {
        return { status: false, result: error }
    }
}