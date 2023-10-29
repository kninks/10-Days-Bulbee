import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
import { v4 as uuidv4 } from 'uuid';
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('MongoDB Connection Error:', error);
    });

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
            picture_url: req.picture_url,
            bulb_price: req.bulb_price,
            quantity: req.quantity
        })

        return { status: true, result: product}
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
        return { status: false, result: error } 
    }
}

export async function get_all_products() {
    try {
        // console.log('get_all_products function called');
        const database = client.db('productsDB');
        const col = database.collection('admin');
        const products = await col.find().toArray();
    //    console.log(products);
        return products;
    } catch(error) {
        return { status: false, result: error };
    }
}

export async function get_products_by_category(category) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('admin');
        const products = await col.find({ category: category }).toArray();
        return products;
    } catch (error) {
        return { status: false, result: error };
    }
}

export async function update_quantity(req) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('admin');
        // console.log(req)

        const ref = { id: req.id }
        const product = await col.findOne(ref)

        // console.log('product.quantity', product.quantity)
        // console.log('req.quantity', req.count)

        const calculate = parseFloat(product.quantity) - parseFloat(req.count)
        // console.log('calculate', calculate)
        const updated = await col.updateOne(ref, { $set: {quantity: calculate}})
        // console.log(updated)
        
        if (updated.modifiedCount === 1) {
            return { status: true, result: 'Update successfully'}
        } else {
            return { status: false, result: 'Error'}
        }
        
    } catch(error) {
        return { status: false, result: error} 
    }
}
