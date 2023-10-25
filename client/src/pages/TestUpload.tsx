import { useState } from 'react'
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


function TestUpload() {

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

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

    </div>
  );
}

export default TestUpload;