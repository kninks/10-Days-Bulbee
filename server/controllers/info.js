const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)
client.connect();

async function insert_discount(req) {
    try {
        const database = client.db('usersDB')
        const col = database.collection('info')

        const user = await col.insertOne({ sid: req.sid, discount: ["universal"], bulb: 10000})

        return user
    } catch(error) {
        return { status: false, result: error}
    }
}

async function discount_code(req) {
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

module.exports = { discount_code, insert_discount }