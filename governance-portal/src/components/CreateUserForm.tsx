import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CreateUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            Swal.fire('Error', 'Username and password are required', 'error');
            return;
        }

        try {
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('Success', `User '${username}' created successfully!`, 'success');
                // Clear the form
                setUsername('');
                setPassword('');
                setRole('user');
            } else {
                Swal.fire('Error', data.error || 'Failed to create user.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'An unexpected error occurred.', 'error');
        }
    };

    return (
        <form className="p-4 space-y-4 bg-gray-50 border border-gray-200 rounded-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                    <label htmlFor="new-username" className="text-sm font-medium text-gray-700">New Username</label>
                    <input
                        type="text"
                        id="new-username"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="new-password" className="text-sm font-medium text-gray-700">Temporary Password</label>
                    <input
                        type="password"
                        id="new-password"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="officer">Officer</option>
                        <option value="adviser">Adviser</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
};

export default CreateUserForm;
