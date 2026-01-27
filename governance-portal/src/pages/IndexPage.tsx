
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('user');
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Governance Portal</h1>
            <p>This is the main landing page. Public content will go here.</p>
            <a href="/admin">Go to Admin Dashboard</a>
        </div>
    );
};

export default IndexPage;
