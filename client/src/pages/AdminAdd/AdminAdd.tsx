import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AdminAdd.css'
import axios from 'axios'

interface UploadParams {
    image: File;
    product: string;
    description: string;
    category: string;
    quantity: number;
    price: number
}

// async function postData({image, product, description, category, quantity, price}: UploadParams) {
//     const formData = new FormData();
//     formData.append("image", image)
//     formData.append('name', product)
//     formData.append('description', description)
//     formData.append('category', selectedOption)
//     formData.append('quantity', quantity.toString())
//     formData.append('price', price.toString())

    // console.log('Data to be sent to the server:', {
    //     image,
    //     product,
    //     description,
    //     category,
    //     quantity,
    //     price,
    // });
  
//     const result = await axios.post('http://localhost:4000/s3/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
//     const imageURL = result.data.imageUrl;
  
//     return imageURL;
//   }

const AdminAdd = () => {
    const [file, setFile] = useState()
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')
    const [selectedOption, setSelectedOption] = useState<string>('Beauty');
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState<string[]>([]);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        // if (file) {
        //   const result = await postData({ image: file, product, description, category, quantity, price });
        //   setImages([result, ...images]);
        // }
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('product', product);
            formData.append('description', description);
            formData.append('category', selectedOption);
            formData.append('quantity', quantity.toString());
            formData.append('price', price.toString());

            try {
                const response = await axios.post('http://localhost:4000/s3/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
        
                if (response.data.status === 'success') {
                  const imageUrl = response.data.imageUrl;
                  console.log('File upload successful:', imageUrl);
                  setImages([imageUrl, ...images]);
                } else {
                  console.error('File upload failed');
                }
              } catch (error) {
                console.error('Error during the file upload:', error);
              }
    }}

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'product') {
          setProduct(value);
        } else if (name === 'description') {
          setDescription(value);
        } else if (name === 'quantity') {
          setQuantity(parseInt(value) || 0);
        } else if (name === 'price') {
          setPrice(parseInt(value) || 0);
        }
    }

    const fileSelected = (event: any) => {
      const file = event.target.files[0]
      setFile(file)
    }

    const handleCategoryChange = (event: any) => {
        setSelectedOption(event.target.value)
    }

  return (
    <div>
        <div className='admin-title'>Add New Product</div>
    <form onSubmit={submit}>
        <div className='product-title'>
            Product Name
        </div>
            <input type='text' name='product' className='name-input' value={product} onChange={handleInputChange}></input>
        <div className='product-title'>
            Description
        </div>
            <input type='text' name='description' className='description-input' value={description} onChange={handleInputChange} ></input>
        <div className='product-title'>
            Category
        </div>
        <select value={selectedOption} onChange={handleCategoryChange} className='category-dropdown'>
            <option value='Beauty' className='category-option'>Beauty</option>
            <option value='Fasion' className='category-option'>Fasion</option>
            <option value='FoodnDrinks' className='category-option'>Food & Drinks</option>
        </select>
        <div className='product-title'>
            <div className='product-title left'>
                Quantity
            </div>
            <div className='product-title right'>
                Price
            </div>
        </div>
        <div className='input-container'>
            <input type='text' name='quantity' className='two-input left2' value={quantity} onChange={handleInputChange}></input>
            <input type='text' name='price' className='two-input right2' value={price} onChange={handleInputChange}></input>
        </div>
        <div className='product-title'>
            Image
        </div>

        <div className='product-title'>
              <input onChange={fileSelected} type="file" accept="image/*" className='choose-file'></input>

            { images.map( image => (
              <div key={image}>
                <img src={image}></img>
              </div>
            ))}
        </div>
        <button className='add-button' type="submit">
            Add Product
        </button>
    </form>
    </div>
  )
}

export default AdminAdd
