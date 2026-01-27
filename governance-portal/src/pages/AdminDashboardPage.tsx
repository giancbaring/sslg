import React from 'react';
import CreateUserForm from '../components/CreateUserForm';

const AdminDashboardPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Administrator Dashboard</h2>
                <p className="text-center text-gray-600">Manage users and system settings.</p>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Create New User</h3>
                    <CreateUserForm />
                </div>

                {/* Future components like a user list can be added here */}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
