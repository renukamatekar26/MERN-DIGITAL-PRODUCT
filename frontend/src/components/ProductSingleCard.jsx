
import React from 'react'

const ProductSingleCard = ({ product }) => {

    console.log('product in single', product);
    
    return (
        <div className="card card-compact card-bordered bg-base-100 w-96 shadow-lg">
            <figure>
                <img
                    className='w-full h-[200px] object-cover object-top'
                    src={product.image}
                    alt={product.name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description || 'No Product description available'}</p>
                 <div className='price'> ${(product.priceInCents / 100).toFixed(2)}</div>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
  )
}

export default ProductSingleCard

