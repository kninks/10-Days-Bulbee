import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url)

client.connect();

const db = client.db('usersDB');
const userCollection = db.collection('user');
const infoCollection = db.collection('info')

export async function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return {status: false, result: 'unauthorized'}
    };
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return {status: false, result: '403 forbidden'}; //invalid token
            }
            // console.log("decoded")
            // console.log(decoded)
            req.body.sid = decoded.sid;
            next();
        }
    )
}

export async function get_bulb(req) {
    try {
        // console.log("get_bulb")
        // console.log(req.body.sid)
        const bulb = await infoCollection.findOne({sid: req.body.sid})
        console.log({ status: true, result: bulb.bulb })

        return { status: true, result: bulb.bulb }
    } catch (error) {
        return { status: false, result: error }
    }
}

export async function get_user(req) {
    try {
        // console.log("get_user req")
        // console.log(req.body.sid)
        const user = await userCollection.findOne({sid: req.body.sid})
        const res = {
            first_name: user.first_name,
            last_name: user.last_name,
            sid: user.sid,
            phone_number: user.phone_number,
            address: user.address,
            postal_code: user.postal_code,
        }
        console.log({ status: true, result: res })

        return { status: true, result: res }
    } catch (error) {
        return { status: false, result: error }
    }
}

export async function get_all_user(req) {
    try {
        const cursor = userCollection.find({})
        const allUsers = await cursor.toArray();
        console.log("------------------------------")
        console.log(allUsers)
        console.log("usersArray------------------------------")
        return allUsers
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { status: false, result: error }
    }
}

export async function register(req) {
    try {
        let newUser = req.body;
        const duplicate = await userCollection.findOne({sid:newUser.sid});

        if (duplicate) {
            console.log("User already exists!");
            return { status: false, result: "User already exists!"};
        } else {
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
    
            newUser.password = hashedPassword;
            console.log(newUser);

            const insertedUser = await userCollection.insertOne(newUser);
            
            const insertUserInfo = await infoCollection.insertOne({ sid: newUser.sid, discount: [{code: 'universal', amount: 50}, {code: 'massive', amount: 1000}], bulb: 10000})

            if (insertedUser.acknowledged && insertUserInfo.acknowledged) {
                return { status: true, result: "Successful laew" };
            } else {
                console.log("insertedUser")
                console.log(insertedUser)
                console.log("insertedUserInfo")
                console.log(insertedUserInfo)
                return { status: false, result: "Some error occure" };
            }

            
        }
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { status: false, result: "Some error occur!" };
    }
}

export async function login(req, res) {
    try {
        const user = req.body;
        const existedUser = await userCollection.findOne({sid: user.sid});

        if (!existedUser) {
            console.log("User doesn't exist!");
            return { status: false, result: "User doesn't exist!"};
        }

        //User exists
        const match = await bcrypt.compare(user.password, existedUser.password);
        
        if (!match) {
            console.log("Student ID or password is incorrect!");
            return { status: false, result: "Student ID or password is incorrect!" };
        }

        // Create JWTs
        const accessToken = await jwt.sign(
            {sid:existedUser.sid}, 
            process.env.ACCESS_TOKEN_SECRET,
        );

        console.log("Login successful!");
        return {status: true, accessToken, isAdmin: (user.sid === "admin")};
    } catch (error) {
        console.log("Some error occur!");
        console.log(error);
        return { status: false, result: "Some error occur!" };
    }
}

export async function logout(req, res) {
    console.log(req.body)
    return {status: true, result: 'loged out'}
}