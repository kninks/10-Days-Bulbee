import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your server
    fetch('http://localhost:4000/products/get-all')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          price={product.bulb_price} // Adjust property name as needed
          picture_url={product.picture_url}
        />
      ))}
    </div>
  );
};

export default ProductPage;




// import React from 'react';
// import ProductCard from '../components/ProductCard';
// import productImageA from '../assets/product-cush.png';

// const products = Array(7).fill({
//   id: 1, 
//   name: "Product", 
//   price: "$100", 
//   image: productImageA  
// });

// const ProductPage: React.FC = () => {
//   return (
//     <div className="product-grid">
//       {products.map((product, index) => (
//         <ProductCard key={index} image={product.image} name={`${product.name} ${index+1}`} price={product.price} />
//       ))}
//     </div>
//   );
// };

// export default ProductPage;
