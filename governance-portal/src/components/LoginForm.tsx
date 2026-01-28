
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SslgLogo from '../assets/sslg-logo.png';
import SchoolLogo from '../assets/school-logo.png';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.needsEmailBinding) {
                    navigate('/bind-email', { state: { username } });
                } else {
                    localStorage.setItem('user', JSON.stringify({ username: data.username, role: data.role }));
                    navigate('/dashboard');
                }
            } else {
                Swal.fire('Error', data.error || 'Login failed', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred.', 'error');
        }
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-center items-center space-x-4">
                <img src={SchoolLogo} alt="School Logo" className="h-20 w-20" />
                <img src={SslgLogo} alt="SSLG Logo" className="h-20 w-20" />
            </div>
            <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800">Dr. Santiago Dakudao Sr. National High School</h1>
                <h2 className="text-2xl font-bold text-gray-900">SSLG Governance Portal</h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
