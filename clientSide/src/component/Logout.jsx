import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout');
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
            Logout
        </button>
    );
};

export default Logout;
