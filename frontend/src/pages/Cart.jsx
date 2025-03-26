/* eslint-disable no-unused-vars */
import React from 'react'
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51R69qvIICwG018TQ4fAw3SfamhFqTaoH6z90FzWFLsdKrpOIqHwuPoyPmM73SwVjJRG747HHai6BbTcFdx6geaba00gz8g7Toj')

const Cart = () => {
  const { cartItems, decreaseCartItemQuantity, clearCart } = useCart();


  if (cartItems?.length === 0) {
    return <div className='text-black text-3xl text-center my-72'> Your cart is empty</div>
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);


  const handleCheckout = async() => {
    const stripe = await stripePromise;

    const transformedItems = cartItems.map(item =>({
      name: item?.name,
      priceInCents: item?.priceInCents,
      quantity: item?.quantity,
      image: item?.image
    }));

    try {
      const response = await axios.post('http://localhost:5000/stripe/create-checkout-session', {
        line_items: transformedItems
      });

      const { sessionId } = response.data; // ✅ Extract `sessionId` correctly

      const { error } = await stripe.redirectToCheckout({
        sessionId
      });
      if(error){
        console.error('Error during checkout', error);
      }

    } catch (error) {
      console.error('checkout process error', error);
    }
  }

  return (
    <div className='p-4 mt-16 max-w-[1400px] mx-auto'>
      <h2 className='text-2xl font-semibold text-center my-6'> Shopping Cart</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12'>
        {cartItems.map((item, index) => (
          <div key={index} className='bg-white rounded-lg shadow-lg p-4 flex-col flex'>
            <img src={item.image} alt={item.name} className='rounded-md mb-4 w-full h-64 object-cover' />
            <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
            <p className='text-md mb-1'>Price : ${(item.priceInCents / 100).toFixed(2)}</p>
            <div className='flex items-center justify-between text-md mb-3'>
              <p>quantity: {item.quantity}</p>
              <div className='flex items-center'>
                <button className='font-bold hover:underline'
                  onClick={() => decreaseCartItemQuantity(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <div className='text-center mt-8'>
        <p className='text-2xl font-semibold mb-4'>
          Total Price : ${(totalPrice/100).toFixed(2)}
        </p>
        <button 
          className='btn btn-accent'
          onClick={handleCheckout}>
          Procced to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
