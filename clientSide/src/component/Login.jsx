import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { name, password }, {
                 withCredentials: true 
                });
            // localStorage.setItem('token:', response);
            const jsonObject = JSON.parse(response.config.data);
            localStorage.setItem('username', jsonObject.name);
            console.log('res.data', jsonObject.name);

            setMessage(response.data.message);
            if (response.data.message === 'Logged in successfully') {
                navigate('/cards'); // Redirect to the home page
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Identity incorrect');
            } else {
                setMessage('Server Error');
            }
        }
    }

    const handleRegister = () => {
        navigate('/register'); // Redirect to the register page
    }


  return (
    <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your username"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your password"
                />
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            <div className='text-center pt-11'>
                Not a member?
                <a 
                    type="button" 
                    onClick={handleRegister} 
                    className="w-full text-blue-800 p-2 font-medium cursor-pointer"
                    >
                    Register Now
                </a>
            </div>
        </form>
    </div>
  )
}

export default Login