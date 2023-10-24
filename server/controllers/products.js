const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
const { v4: uuidv4 } = require('uuid');
//client.connect();
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('MongoDB Connection Error:', error);
    });


async function add_product(req) {
    try {
        const database = client.db('productsDB');
        const col = database.collection('product');

        const product = await col.insertOne({
            name: req.name,
            id: uuidv4(),
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

async function get_product(req) {
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

async function get_all_products() {
    try {
        console.log('get_all_products function called');
        const database = client.db('productsDB');
        const col = database.collection('product');

        // Use find() to retrieve all products, and toArray() to convert the cursor to an array.
        const products = await col.find().toArray();

        console.log(products);

        return products;
    } catch(error) {
        return { status: false, result: error };
    }
}

module.exports = { add_product, get_product, get_all_products };


//module.exports = { add_product, get_product }