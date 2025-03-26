import React from 'react'
import ProductSingleCard from './ProductSingleCard'

const ProductCard = ({ product }) => {

    console.log("product", product, Array.isArray(product));
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 max-w-[1200px] gap-6 mx-auto place-items-center'>
      {Array.isArray(product) && product.map((product) => (
        <ProductSingleCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductCard;
