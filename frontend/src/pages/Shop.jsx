/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/product')
        
            .then((res) => {
                setProduct(res?.data?.product);
                setFilteredProduct(res?.data?.product)
            })
            .catch((err) => {
                console.log(err);

            })
    }, []);

    const filterProducts = () => {
        if (!Array.isArray(product)) {
            console.error('product is not an array', product);
            return;
        }
        let filtered = [...product];
        if (category != '') {
            console.log(category, ":category");
            
            filtered = filtered.filter((product) => product.category === category)
        }
        setFilteredProduct(filtered);
    }

    useEffect(() => {
        filterProducts();
    }, [product, category]);

    return (
        <div className='p-4 max-w-[1300px] mx-auto mt-16'>
            <div className='filters flex justify-between mb-6'>
                <div className='form-control'>
                    <label className='label'>
                       <span className='label-text'>
                            Category
                       </span>
                    </label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className='select select-bordered w-full max-w-xs'>
                        <option value=''>All</option>
                        <option value="course">Courses</option>
                        <option value="template">Templates</option>
                    </select> 
                </div>
            </div>
            <ProductCard product={filteredProduct} />
        </div>
    )
}

export default Shop
