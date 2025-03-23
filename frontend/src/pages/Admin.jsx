/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Links } from 'react-router-dom'
// import { axios } from 'axios';

function Admin() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/product')
      .then((res) => {
        debugger;
        setProduct(res?.data?.product);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);

      })
  }, [])
  return (
    <div className='px-4 py-8 max-w-7xl bg-gray-500 mx-auto'>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>
                <Link to="/admin/product/create"
                  className='bg-green-600 hover:bg-green-900 text-white py-2 px-4 font-medium rounded-lg shadow-md'>
                  Add Item +
                </Link>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>
            {product.map((product, index) => (
              <tr key={product._id} className='bg-white hover:bg-gray-300 text-yellow-600'>
                <td>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </div>
                </td>

                <td className='py-3 px-5'>{product.name}</td>
                <td className='py-3 px-5'>{product.priceInCents}</td>
                <td className='py-3 px-5'>{product.description}</td>
                <td className='py-3 px-5'>{product.category}</td>
                <td className='py-3 px-5'>
                  <div className='flex justify-center gap-x-1'>
                  <Link to={`/admin/product/edit/${product._id}`} 
                  className='bg-orange-500 hover:bg-orange-900 text-white py-2 px-4 font-medium rounded-lg text-sm'>
                  Edit</Link>
                  <Link to={`/admin/product/delete/${product._id}`} 
                  className='bg-red-500 hover:bg-red-900 text-white py-2 px-4 font-medium rounded-lg text-sm'>
                  Delete</Link>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Admin;
