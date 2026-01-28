import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ProfileForm = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newUsername, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('Success', 'Your profile has been updated successfully!', 'success');
                setNewUsername('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                Swal.fire('Error', data.error || 'Failed to update profile.', 'error');
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
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                    <label htmlFor="new-password" className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="new-password"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Profile
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
