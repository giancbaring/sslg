import React from 'react';
import IndexPage from './pages/IndexPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const App = () => {
    const [route, setRoute] = React.useState(window.location.pathname);

    React.useEffect(() => {
        const handlePopState = () => {
            setRoute(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    let Component;
    switch (route) {
        case '/':
            Component = IndexPage;
            break;
        case '/admin':
            Component = AdminDashboardPage;
            break;
        default:
            // You can add a 404 page here
            Component = () => <div>404 Not Found</div>;
            break;
    }

    return <Component />;
};

export default App;
