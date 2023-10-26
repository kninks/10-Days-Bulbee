import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AdminAdd.css'
import axios from 'axios'

interface ImageUploadParams {
    image: File;
    description: string;
}

async function postImage({image, description}: ImageUploadParams) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)
  
    const result = await axios.post('http://localhost:4000/s3/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    const imageURL = result.data.imageUrl;
  
    return imageURL;
  }

const AdminAdd = () => {
    const [file, setFile] = useState()
    const [description, setDescription] = useState("")
    const [images, setImages] = useState<string[]>([]);

    const submit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (file) {
        const result = await postImage({ image: file, description });
        setImages([result, ...images]);
      }
    }

    const fileSelected = (event: any) => {
      const file = event.target.files[0]
      setFile(file)
    }

    const [selectedOption, setSelectedOption] = useState('Noen')

        const handleDropdownChange = (e: any) => {
        setSelectedOption(e.target.value)
    }

  return (
    <div>
        <div className='admin-title'>Add New Product</div>
    <form onSubmit={submit}>
        <div className='product-title'>
            Product Name
        </div>
            <input type='text' name='name' className='name-input'></input>
        <div className='product-title'>
            Description
        </div>
            <input type='text' name='description' className='description-input' value={description} onChange={e => setDescription(e.target.value)} ></input>
        <div className='product-title'>
            Category
        </div>
        <select value={selectedOption} onChange={handleDropdownChange} className='category-dropdown'>
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
            <input type='text' name='quantity' className='two-input left2'></input>
            <input type='text' name='price' className='two-input right2'></input>
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
    </form>
        <button className='add-button' type="submit">
            Add Product
        </button>
    </div>
  )
}

export default AdminAdd
