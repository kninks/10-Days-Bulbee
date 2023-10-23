const express = require('express');
const { createServer } = require('node:http');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const server = createServer(app);

app.use(express.json()) 
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});

app.get('/', (req, res) => {
    res.send('API connected');
});

// const users = [
//     {
//         sid: 'knink',
//         password: 'hihi'
//     }
// ]

// // Log in -------------------------------------------------
// const { MongoClient } = require('mongodb')
// const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority'
// const client = new MongoClient(url)

// const db = client.db('usersDB');
// const collection = db.collection('user');

// app.get('/users', (req, res) => {
//     // res.json(users)
//     console.log('/users is called')
//     client.connect((err) => {
//         if (err) {
//             console.error('Error connecting to the database:', err);
//         } else {
//             console.log('Connected successfully to the database');
//         }
//     });
// })

// app.post('/users/register', async (req, res) => {
//     try {
//         console.log(req.body)
//         // const user = req.body
//         // const salt = await bcrypt.genSalt()
//         // const hashedPassword = await bcrypt.hash(user.password, salt)
//         // user.password = hashedPassword
//         // console.log(user)

//         // console.log(db)
//         // console.log(col)

//         // col.insert_one(user)
//         // const user = {sid: req.body.sid, password: hashedPassword}
//         // users.push(user)
//         // res.status(201).send()
//     } catch {
//         res.status(500).send()
//         console.log('errorrrr')
//     }
// })

// app.post('/users/login', async (req, res) => {
//     console.log(req.body);
//     const data = req.body;
//     const user = users.find(user => user.sid = req.body.sid);
//     console.log(user);
//     if (user === null) {
//         return res.status(400).send('Cannot find user')
//     }
//     try {
//         if (await data.password === user.password) {
//             res.send({message: 'Success'})
//             console.log('Success')
//         } else {
//             res.send({message: 'Not Allowed'})
//             console.log('Not Allowed')
//         }
//         // if (await bcrypt.compare(req.body.password, user.password)) {
//         //     res.send('Success')
//         // } else {
//         //     res.send('Not Allowed')
//         // }
        
//     } catch {
//         res.status(500).send()
//     }
// })


//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "127.0.0.1"; 
server.listen(PORT, SERVER_IP, () => {
    console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});



