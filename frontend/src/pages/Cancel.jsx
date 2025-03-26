import React from 'react'

const Cancel = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-base-100 border text-base-content'>
      <div className='text-center p-10 rounded-lg shadow-xl bg-base-200 border border-[#e0e0e9]'>
      <h1 className='text-4xl font-bold mb-4'>payment Canceled.</h1>
      <p className='text-lg'>Your payment has been placed canceled. Please try again </p>
      </div>
    </div>
  )
}

export default Cancel
