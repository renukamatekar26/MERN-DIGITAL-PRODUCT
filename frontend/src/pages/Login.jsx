import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ 
    email: '',
    password: '',  
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [password, setPassword] = useState('');

  const handleUserInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setStatusMessage('');
    setIsSuccess(false);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      
    const response = await axios.post('http://localhost:5000/auth/login', loginData);
      console.log('res', response?.data);
      localStorage.setItem('token', response?.data?.token);
      navigate('/admin');
      
      setIsSuccess(true);
      setStatusMessage('User Logged in successfully');

    } catch (error) {
      setIsSuccess(false);
      console.log(error?.response);
      
      setStatusMessage(error?.response?.data || ' login failed' );
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-100'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {statusMessage && (
        <p className={`${isSuccess ? 'text-green-500' :
          'text-red-500'} text-lg italic mb-4`}>{statusMessage}</p>
      )}
      <form className='w-full max-w-md border border-gray-300 rounded p-5' onSubmit={handleLogin}>
      
        <label htmlFor='email' className='block text-md text-gray-600 my-2'>Email Id</label>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={loginData?.email}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />
        <label htmlFor='password' className='block text-md text-gray-600 my-2'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={loginData?.password}
          onChange={handleUserInput}
          className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
        />

        
        <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md w-full my-4'
        >Log In</button>
      </form>
      <p className='mt-4'>No Account Yet?</p>
      <Link to="/register" className='text-blue-500 hover:text-blue-800 text-lg'>Sign Up</Link>
    </div>
  )
}

export default Login
