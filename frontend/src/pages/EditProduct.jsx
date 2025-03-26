import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EditProduct = () => {
    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    // const [img, setImg] = useState(null);
    // const [imgPreview, setImgPreview] = useState(null);
    // const [imgUrl, setImgUrl] = useState(''); // Store image URL separately for change
    

    // to re route to admin dashboard after sucessfully edit of product
    const navigate = useNavigate();
    // React JS useParams Hook helps to access the parameters of the current route to manage the dynamic routes in the URL
    const { id } = useParams();

    // notification
    const { enqueueSnackbar } = useSnackbar();

    // authorize user to edit product
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        
        setLoading(true);
        axios.get(`http://localhost:5000/product/${id}`)
            .then((res) => {
                console.log("res in edit", res.data);
                
                setName(res?.data?.product?.name);
                setPriceInCents(res?.data?.product?.priceInCents);
                setDescription(res?.data?.product?.description);
                // setImg(res?.data?.product?.image || null);
                // setImgPreview(res?.data?.product?.image || null);
                // setImgUrl(res?.data?.product?.image || null);
                setCategory(res?.data?.product?.category);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                alert('An error happened. Try again');

            })
    }, [id]);

        // file handler
        // const handleFileChange = (e) => {
        //     debugger;
        //     const selectedFile = e.target.files[0] ;

        //     if (selectedFile) {
        //         setImg(selectedFile);
        //         const fileUrl = URL.createObjectURL(selectedFile);
        //         setImgPreview(fileUrl); // Show new preview for the selected file
        //         setImgUrl(selectedFile.name); // Show file name in text field

        //         const reader = new FileReader();
        
        //         setImg(selectedFile.name); // Show file name instead of "No file chosen"
            
        //         reader.onloadend = (e) => {
        //             setImgPreview(e.target.result);
        //         }
        //         reader.readAsDataURL(selectedFile);
        //     }
        //     else{
        //         // If no file is selected, retain the previous image URL
        //     setImg(img);
        //     setImgUrl(null);   
        //     }
    
        //     // if(!selectedFile) setImgPreview(null);
  
        // }
    
        // const uploadFile = async () =>{
            
        //     // console.log('img', img, imgPreview);
            
        //     // if(!img || !imgPreview) {
        //     //     enqueueSnackbar('No image selected', {variant: 'warning'});
        //     //     return;
        //     // }
        //     const data =  new FormData();
        //     if (imgUrl) {
        //         data.append("file", imgUrl); // If a new image is selected, use it
        //     } else {
        //         data.append("file", img); // Else, use the existing image URL
        //     }
        //     // data.append('file', img);
        //     try{
        //         const uploadedUrl = `http://localhost:5000/upload-image/${id}`;
        //         const res = await axios.put(uploadedUrl, data);
    
        //         const { secure_url } = res.data;
        //         console.log("uploaded image url", secure_url);
        //         enqueueSnackbar('Image uploaded successfully', {variant: 'success'});
        //         return secure_url;
                
        //     }
        //     catch(error){
        //         console.log("Fail to upload image url", error);
        //         enqueueSnackbar('Fail to upload image url', {variant: 'error'});
        //     }
        // }

    const handleEditProduct = async() => {
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
        // const uploadedImageUrl = await uploadFile();
        // console.log("uploadedImageUrl", uploadedImageUrl);
                
        // if(!uploadedImageUrl) throw new Error('Image upload failed');

        const data = { name, priceInCents, description, category}; //image: uploadedImageUrl

        setLoading(true);
        axios.put(`http://localhost:5000/product/${id}`, data, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Product edited successfully.', { variant: 'success' });
                navigate('/admin')
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error while editing the product.', { variant: 'error' });
                console.log(error);

            })
    }

    if(loading){
        return <Spinner />;
    }

    return (
        <div className='p-6 bg-base-100 flex justify-center items-center'>
        
            <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'>
                <Link to='/admin'
                 className='flex justify-center items-center  mb-4 w-24 py-[10px] px-4 text-sm rounded-xl'>
                 Back</Link>
                 <h1 className='text-3xl font-semibold my-4 border-base-300'>Edit Product</h1>
                 <div className='my-4'>
                 {/* name */}
                 <label htmlFor='name' className='block text-md border-base-300 mb-2'>Name</label>
                 <input 
                    id='name'
                    type='text'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    className='border border-base-300  px-4 py-2 w-full rounded-md '
                 />
                 {/* price in cents */}
                <label htmlFor='priceInCents' className='block text-md border-base-300 mb-2'>
                Price in Cents</label>
                 <input 
                    id='priceInCents'
                    type='text'
                    value = {priceInCents}
                    onChange={(e) => setPriceInCents(e.target.value)}
                    className='border border-base-300  px-4 py-2 w-full rounded-md '
                 />

                 {/* description */}
                <label htmlFor='description' className='block text-md border-base-300 mb-2'>
                Description</label>
                 <input 
                    id='description'
                    type='text'
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border border-base-300  px-4 py-2 w-full rounded-md '
                 />

                 {/* category */}
                <label htmlFor='category' className='block text-md border-base-300 mb-2'>
                Category</label>
                <select
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full border border-base-300  px-4 py-2 rounded-md '
                required>
                    <option value="" disabled>Select Category</option>
                    <option value="course">Course</option>
                    <option value="template">Template</option>
                </select>

                {/* <label htmlFor='img' className='block text-md border-base-300 mb-2'>
                    Upload Image</label>
                     <input 
                        id='img'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        required
                        style={{ display: "none" }} 
                        className='border border-base-300  px-4 py-2 w-full rounded-md '
                     />
                     
                <button 
                    onClick={() => document.getElementById("img").click()}
                    style={{
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: "#f8f8f8"
                    }}
                >
                    Choose File
                </button>

                <textarea type="text" value={img} readOnly style={{ width: '100%', height: '50px', resize: 'none', overflowWrap: 'break-word'
                , overflow: 'hidden', border: 'none', outline: 'none', }}  />      

                {imgPreview && (
                    <div>
                    <img src={imgPreview} alt="Product" width="100" />
                    </div>
                )} */}
                <button onClick={handleEditProduct}
                className='w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4'>
                    Save Changes
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

export default EditProduct
