/* eslint-disable no-debugger */

import React, { useCallback } from 'react'
import { useCart } from '../context/CartContext';

const ProductSingleCard = ({ product }) => {
    const { addToCart, 
        removeFromCart,
        cartItems } = useCart();

        const itemsInCart = cartItems.find((item) => item._id === product._id );
        console.log('itemsincart', itemsInCart);
        

        const quantity = itemsInCart ? itemsInCart.quantity : 0;
        console.log("quantity", quantity);
        

        const handleRemoveFromCart = useCallback(() => {
            debugger;
            removeFromCart(product._id);
        }, [product._id, removeFromCart])
        
        const handleAddToCart = () => {
            addToCart(product);
        }

    console.log('product in single', product);
    
    return (
        <div className="card card-compact card-bordered bg-base-100 w-96 md:w-80 lg:w-96 shadow-lg border-[#dddcdc]">
            <figure>
                <img
                    className='w-full h-[200px] object-cover object-top'
                    src={product.image}
                    alt={product.name} />
            </figure>
            <div className="card-body bg-base-200">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description || 'No Product description available'}</p>
                 <div className='price'> ${(product.priceInCents / 100).toFixed(2)}</div>
                <div className="card-actions justify-end">
                {quantity > 0 ? (
                    <button className="btn btn-error"
                        onClick={handleRemoveFromCart}>
                        Remove from cart
                    </button>

                ) : (
                    <button className="btn btn-primary"
                        onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                )}
                    
                </div>
            </div>
        </div>
  )
}

export default ProductSingleCard

