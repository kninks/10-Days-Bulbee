const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://bupbee:bulbeepassword@bulbeedb.oqjikje.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

async function insertProducts(products) {
  try {
    await client.connect();
    const database = client.db('productsDB');
    const collection = database.collection('product');
    
    // Insert multiple products into the collection
    const result = await collection.insertMany(products);
    
    console.log(`${result.insertedCount} products inserted successfully.`);
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    await client.close();
  }
}

// Sample product data in JSON format
const sampleProducts = [
{
    name: 'BEACH JEANS SHIRT',
    description: 'เสื้อเชิ้ตยีนส์แขนสั้นทรง oversize ผ้ายีนส์อย่างดี ลายปักด้านหน้าแบบ summer น่ารักไม่ไหว งานปักอย่างดี ห้ามพลาด ',
    category: 'Clothes',
    picture_url: '',
    bulb_price: 690,
    quantity: 50,
  },
//   {
//     name: 'แคนเมค มาชเมโลว์ ฟินิส พาวเดอร์ อะบลูม แป้งโปรงแสง เนื้อแมทท์',
//     description: 'What it is: Hyper slim cushion that completes the perfect skin lasting 50 hours with a single touch (Color retention) What it does: Always Matt, Always NEO ! 50-hour long-lasting solution with excellent blending, coverage and lightness upgraded with enhanced powder technology. NEO will #always protect your skin Skin balance must never be missed, even in makeup.?Replenishing the goodness once a day to flatter the original skin. Firming, anti-oxidation and Moisturizing! Filled with good, Feel the good',
//     category: 'Beauty',
//     picture_url: 'https://example.com/product1.jpg',
//     bulb_price: 500,
//     quantity: 50,
//   },
//   {
//     name: 'ICY GLAZE GLOSS ลิปกลอสลากลาส 🧊ลากลาส LA GLACE 2G.',
//     description: 'ลิปกลอสลากลาส 2 กรัม #01 PIXIE DUSt #02 GOD’S FAV #03 LIKE A VIRGIN #04 TEENAGE DREAM #05 WILD QUEEN#06 FLARE UP 1 แท่ง 199.- ซื้อครบ 6 แท่ง (คละสี) 999.-ซื้อครบ 6 สี (ทุกสี) แถม BOX SET',
//     category: 'Beauty',
//     picture_url: 'https://example.com/product1.jpg',
//     bulb_price: 150,
//     quantity: 250,
//   },
//   {
//     name: 'Euro ฟัฟเค้กสอดไส้ ตรายูโร่ 144g (เลือกรสได้)-ครีมมาร์เบิ้ลช็อก',
//     description: 'ส่วนผสม ไข่ไก่ 40%, กลูโคสไซรัป 19%, แป้งสาลี 16%, น้ำตาลทราย 15%, น้ำมันปาล์ม 9.5%, นมผง 0.5% ส่วนผสม ไข่ไก่ 40%, กลูโคสไซรัป 19%, แป้งสาลี 16%, น้ำตาลทราย 15%, น้ำมันปาล์ม 9.5%, นมผง 0.5%',
//     category: 'FoodDrinks',
//     picture_url: '',
//     bulb_price: 50,
//     quantity: 500,
//   },
//   {
//     name: 'Ovaltine โอวัลตินคุกกี้สอดไส้ช็อกโกแลต 30 กรัม x 12 ซอง',
//     description: 'โอวัลตินคุกกี้  คุกกี้สอดไส้ครีมช็อกโกแลตมอลต์ ประโยชน์จากมอลต์ นมโคโอวัลตินคุกกี้  คุกกี้สอดไส้ครีมช็อกโกแลตมอลต์ ประโยชน์จากมอลต์ นมโคโอวัลตินคุกกี้  คุกกี้สอดไส้ครีมช็อกโกแลตมอลต์ ประโยชน์จากมอลต์ นมโค',
//     category: 'FoodDrinks',
//     picture_url: '',
//     bulb_price: 66,
//     quantity: 300,
//   },
//   {
//     name: 'Kemy food grain roshe 36g premium dessert Grain Rocher 개미식품 그레인로쉐',
//     description: 'ขนมเกาหลี Kemy food grain roshe 36g premium dessert Grain Rocher 개미식품 그레인로쉐New product คริสปี้โรล  ทำจากธัญพืช 21 ชนิด อร่อยมีประโยชน์“Grain Rocher” is a chocolate snack that has been reinterpreted in a trendy way by keeping of Crispy Roll Grain as it is 21',
//     category: 'FoodDrinks',
//     picture_url: '',
//     bulb_price: 99,
//     quantity: 250,
//   },

];

// Call the insertProducts function with your data
insertProducts(sampleProducts);
