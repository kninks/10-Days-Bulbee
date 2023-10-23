const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

const db = client.db('usersDB');
const collection = db.collection('user');

async function login(req) {
    console.log(req.body);
    const user = req.body;
    const foundUser = users.find(user => user.sid = req.body.sid);
    if (user === null) {
        return res.status(400).send('Cannot find user')
    }
    try {

        if (await data.password === user.password) {
            res.send({message: 'Success'})
            console.log('Success')
        } else {
            res.send({message: 'Not Allowed'})
            console.log('Not Allowed')
        }
        // if (await bcrypt.compare(req.body.password, user.password)) {
        //     res.send('Success')
        // } else {
        //     res.send('Not Allowed')
        // }
        
    } catch {
        res.status(500).send()
    }
}

async function reg(req) {
    console.log(req.body)
    console.log(db)
    console.log(col)
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(hashedPassword)

        const foundUser = await collection.findOne({ id: req }, { projection: {_id: 0}})
        // const user = {sid: req.body.sid, password: hashedPassword}
        // users.push(user)
        // res.status(201).send()
    } catch {
        // res.status(500).send()
    }
}

async function get_user() {
    try {
        const user = collection.find()
        console.log(user)
        return user
    } catch (error) {

    }
}

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

module.exports = { add_product, get_product }
