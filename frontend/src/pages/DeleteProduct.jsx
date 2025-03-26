/* eslint-disable no-unused-vars */
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const DeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    
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

        const handleDeleteProduct =() =>{
            setLoading(true);
            axios.delete(`http://localhost:5000/product/${id}`, config)
            .then(() =>{
                setLoading(false);
                enqueueSnackbar('product deleted successfully', {variant: 'success'})
                navigate('/admin')
            })
            .catch((error) =>{
                setLoading(false);
                enqueueSnackbar('Something went wrong', {variant: 'error'})
            })
        }

        if(loading){
            return <Spinner />;
        }
    return (
        <div className='p-6 flex justify-center items-start'>
            <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-base-200'>
                <Link to='/admin'
                className='btn-accent flex justify-center items-center mb-4 w-24 py-[10px] px-4 text-sm rounded-xl'>
                Back</Link>
                <h2 className='text-2xl mb-4 font-semibold'>
                    Are you sure you want to delete this product?
                </h2>
                <button
                onClick={handleDeleteProduct}
                className='bg-red-600 hover:bg-red-900  py-2 px-4 rounded-lg w-full'>
                Yes, Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteProduct
