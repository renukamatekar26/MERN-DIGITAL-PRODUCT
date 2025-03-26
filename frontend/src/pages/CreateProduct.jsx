/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


const CreateProduct = () => {
    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // authorize user to edit product
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    // file handler
    const handleFileChange = (e) => {
        debugger;
        const selectedFile = e.target.files[0];
        setImg(selectedFile);

        if(!selectedFile) setImgPreview(null);

        const reader = new FileReader();
        reader.onloadend = (e) => {
            setImgPreview(e.target.result);
        }
        reader.readAsDataURL(selectedFile);
    }

    const uploadFile = async () =>{
        if(!img) {
            enqueueSnackbar('No image selected', {variant: 'warning'});
            return;
        }
        const data =  new FormData();
        data.append('file', img);
        try{
            const uploadedUrl = 'http://localhost:5000/upload-image';
            const res = await axios.post(uploadedUrl, data);

            const { secure_url } = res.data;
            console.log("uploaded image url", secure_url);
            enqueueSnackbar('Image uploaded successfully', {variant: 'success'});
            return secure_url;
            
        }
        catch(error){
            console.log("Fail to upload image url", error);
            enqueueSnackbar('Fail to upload image url', {variant: 'error'});
        }
    }

    const handleSaveProduct = async() => {
        if(!name || !priceInCents || !category || !description) {
            enqueueSnackbar('Please fill all the required fields', {variant: 'warning'});
            return;
        }
        const price = parseInt(priceInCents);
        if(isNaN(price) || price<=0 ){
            enqueueSnackbar('Price must be greater than 0', {variant: 'warning'});
            return;
        }
        setLoading(true);
        try {
            debugger;
            const uploadedImageUrl = await uploadFile();
            console.log(uploadedImageUrl);
            
            if(!uploadedImageUrl) throw new Error('Image upload failed');

            const formData = {
                name,
                priceInCents,
                description,
                category,
                image: uploadedImageUrl
            }
            debugger;
            await axios.post(`${import.meta.env.VITE_REACT_APP_BASEURL}/product`, formData, config);
            enqueueSnackbar('Product saved successfully', {variant: 'success'})
            navigate('/admin');
        } catch (error) {
            console.log('Error:', error);
            enqueueSnackbar(`Error while saving product ${error.response?.data?.message || error?.message}`,{variant: 'error'} )
            
        }
        finally{
            setLoading(false);
        }

    };

  return (
    <div className='p-6 bg-base-100 flex justify-center items-center'>
            
                <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'>
                    <Link to='/admin'

                     className=' flex justify-center items-center mb-4 w-24 py-[10px] px-4 text-sm rounded-xl btn btn-accent'>
                     Back</Link>
                     <h1 className='text-3xl font-semibold my-4 '>Create Product</h1>
                     <div className='my-4'>
                     {/* name */}
                     <label htmlFor='name' className='block text-md  mb-2'>Name</label>
                     <input 
                        id='name'
                        type='text'
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-base-300 focus:text-black px-4 py-2 w-full rounded-md '
                     />
                     {/* price in cents */}
                    <label htmlFor='priceInCents' className='block text-md  mb-2'>
                    Price in Cents</label>
                     <input 
                        id='priceInCents'
                        type='text'
                        value = {priceInCents}
                        onChange={(e) => setPriceInCents(e.target.value)}
                        className='border border-base-300 focus:text-black px-4 py-2 w-full rounded-md '
                     />
    
                     {/* description */}
                    <label htmlFor='description' className='block text-md  mb-2'>
                    Description</label>
                     <input 
                        id='description'
                        type='text'
                        value = {description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border border-base-300 focus:text-black px-4 py-2 w-full rounded-md '
                     />
    
                     {/* category */}
                    <label htmlFor='category' className='block text-md  mb-2'>
                    Category</label>
                    <select
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full border border-base-300 focus:text-black px-4 py-2 rounded-md '
                    required>
                        <option value="" disabled>Select Category</option>
                        <option value="course">Course</option>
                        <option value="template">Template</option>
                    </select>

                    <label htmlFor='img' className='block text-md  mb-2'>
                    Upload Image</label>
                     <input 
                        id='img'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        required
                        className='border border-base-300 focus:text-black px-4 py-2 w-full rounded-md '
                     />

                     {imgPreview && (
                        <div className='my-4'>
                            <img src={imgPreview} alt='Preview' className='max-w-full h-auto' />
                        </div>
                     )}

                    <button onClick={handleSaveProduct}
                    className='w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4'>
                        Save Product
                    </button>
                     {/* <input 
                        id='category'
                        type='text'
                        value = {category}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border border-base-300 px-4 py-2 w-full rounded-md'
                     /> */}
                     </div>
                </div>
            </div>
  )
}

export default CreateProduct
