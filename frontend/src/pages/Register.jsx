import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [password, setPassword] = useState('');

  const handleUserInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setStatusMessage('');
    setIsSuccess(false);
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData?.password != userData?.cpassword) {
      setIsSuccess(false);
      setStatusMessage(`Passwords don't match`);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios.post('http://localhost:5000/auth/register', userData, config)
      setIsSuccess(true);
      setStatusMessage('User registered successfully');
      navigate('/login');
    } catch (error) {
      setIsSuccess(false);
      console.log(error?.response);
      
      setStatusMessage(error?.response?.data || 'User registration failed' );
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-100'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      {statusMessage && (
        <p className={`${isSuccess ? 'text-green-500' :
          'text-red-500'} text-lg italic mb-4`}>{statusMessage}</p>
      )}
      <form className='w-full max-w-md border border-gray-300 rounded p-5' onSubmit={handleRegister}>
      <label htmlFor='name' className='block text-md text-gray-600 my-2'>Username</label>
        <input
          type='text'
          name='name'
          placeholder='Username'
          value={userData?.name}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />
        <label htmlFor='email' className='block text-md text-gray-600 my-2'>Email Id</label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={userData?.email}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />
        <label htmlFor='password' className='block text-md text-gray-600 my-2'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={userData?.password}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />

        <label htmlFor='cpassword' className='block text-md text-gray-600 my-2'>Confirm Password</label>
        <input
          type='password'
          name='cpassword'
          placeholder='Confirm password'
          value={userData?.cpassword}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />
        <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md w-full my-4'
        >Submit</button>
      </form>
      <p className='mt-4'>Existing Account?</p>
      <Link to="/login" className='text-blue-500 hover:text-blue-800 text-lg'>Sign In</Link>
    </div>
  )
}

export default Register
