/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchData() {

            // You can await here
            await axios.get('http://localhost:5000/product')
                .then((res) => {

                    console.log('res', res?.data, typeof(res.data));

                    setProduct(res?.data?.product);
                })
                .catch((error) => {

                    console.log(error);
                })
        }
        fetchData();

    }, [])
    return (
        <div className='p-4 max-w-[1300px] mx-auto mt-16'>
            <div className='hero-content text-center mb-24'>
                <div className='max-w-md'>
                    <h1 className='text-5xl font-bold'>
                        Welcome to <span className='text-teal-700'>Eccomerce</span>
                    </h1>
                    <p className='py-6'>
                        We offer high quality online courses for programming
                        and website templates you can buy
                    </p>
                    <a className='btn btn-accent mt-4' href='/shop'>Shop</a>
                    
                </div>
            </div>
            <ProductCard product={product} />
        </div>
    )
}

export default Home
