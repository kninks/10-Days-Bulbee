const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://kninks:g7BnkmXeFwNcYvWm@bulbee.rwywmi9.mongodb.net/'
const client = new MongoClient(url)

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e);
}
let db = conn.db("bulbee");

export default db;