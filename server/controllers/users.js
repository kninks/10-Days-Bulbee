const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)

client.connect();

const db = client.db('usersDB');
const collection = db.collection('user');

async function get_all_user(req) {
    try {
        const cursor = collection.find({})
        const allUsers = await cursor.toArray();
        console.log("------------------------------")
        console.log(allUsers)
        console.log("usersArray------------------------------")
        return allUsers
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { status: false, result: error}
    }
}

async function register(req) {
    try {
        let newUser = req.body;
        const existedUser = await collection.findOne({sid:newUser.sid});

        if (existedUser) {
            console.log("User already exists!");
            return { message: "User already exists!"};
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
    
            newUser.password = hashedPassword;
            console.log(newUser);

            const insertedUser = await collection.insertOne(newUser);
            console.log(insertedUser);

            return insertedUser;
        }
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { message: "Some error occur!" };
    }
}

async function login(req) {
    try {
        const user = req.body;
        const existedUser = await collection.findOne({sid: user.sid});

        if (!existedUser) {
            console.log("User doesn't exist!");
            return { message: "User doesn't exist!"};
        }

        const isPasswordValid = await bcrypt.compare(user.password, existedUser.password);
        
        if (!isPasswordValid) {
            console.log("Username or Password is incorrect!");
            return { message: "Username or Password is incorrect!" };
        }

        const token = await jwt.sign({id:existedUser._id}, "bulbee");
        console.log("Login successful!");
        return {token, sid: existedUser.sid};
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { message: "Some error occur!" };
    }
}

module.exports = { get_all_user, register, login }