import React, { useEffect } from 'react'
import { useCart } from './../context/CartContext';

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    console.log('payment was successful, clearing cart');
    clearCart();
  }, [clearCart]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-base-100 border text-base-content'>
      <div className='text-center p-10 rounded-lg shadow-xl bg-base-200 border border-[#e0e0e9]'>
      <h1 className='text-4xl font-bold mb-4'>payment successful.</h1>
      <p className='text-lg'>Your order has been placed successfully.</p>
      </div>
    </div>
  )
}

export default Success
