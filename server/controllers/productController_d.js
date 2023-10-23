const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/yourDatabaseName';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, productsCollection;

client.connect(err => {
  if (err) throw err;
  console.log("Connected to MongoDB");
  
  db = client.db("ProductDB");
  productsCollection = db.collection("product");
});

exports.getProducts = async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
