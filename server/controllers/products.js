import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
import { v4 as uuidv4 } from 'uuid';
client.connect();

export async function add_product(req) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('admin');
        // console.log('req form add product', req)

        const product = await col.insertOne({
            name: req.name,
            id: uuidv4(),
            description: req.description,
            category: req.category,
            picture_url: req.image,
            bulb_price: req.price,
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
        const col = database.collection('admin');

        const desc = await col.findOne({ id: req }, { projection: {_id: 0}})
        // console.log(desc) 

        return desc
    } catch(error) {
        return { status: false, result: error} 
    }
}