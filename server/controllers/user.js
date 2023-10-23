const { MongoClient } = require('mongodb')
const url = 'mongodb+srv://kninks:g7BnkmXeFwNcYvWm@bulbee.rwywmi9.mongodb.net/'
const url2 = 'mongodb+srv://kninks:g7BnkmXeFwNcYvWm@bulbee.rwywmi9.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url2)

client.connect();

const db = client.db('bulbee');
const col = db.collection('users');

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
        // const user = {sid: req.body.sid, password: hashedPassword}
        // users.push(user)
        // res.status(201).send()
    } catch {
        // res.status(500).send()
    }
}
