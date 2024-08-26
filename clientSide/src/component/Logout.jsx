import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";

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
        <button onClick={handleLogout} className="bg-red-700 text-white p-2 rounded-full">
            {/* Logout */}
            <AiOutlineLogout />
        </button>
    );
};

export default Logout;
