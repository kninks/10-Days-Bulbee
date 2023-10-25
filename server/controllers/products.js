import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
import { UUID } from 'mongodb';
client.connect();

export async function add_product(req) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('product');

        const product = await col.insertOne({
            name: req.name,
            id: UUID,
            description: req.description,
            category: req.category,
            picture_url: req.picture_url,
            bulb_price: req.bulb_price,
            quantity: req.quantity
        })

        return product
    } catch(error) {
        return { status: false, result: error}
    }
}

export async function get_product(req) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('product');

        const desc = await col.findOne({ id: req }, { projection: {_id: 0}})
        console.log(desc)

        return desc
    } catch(error) {
        return { status: false, result: error} 
    }
}