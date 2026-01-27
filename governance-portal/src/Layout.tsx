import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import OfficersPage from './pages/OfficersPage';
import DocumentsPage from './pages/DocumentsPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';

const Layout: React.FC = () => {
    const location = useLocation();
    const showHeader = location.pathname !== '/';

    return (
        <div className="bg-gray-100 min-h-screen">
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/officers" element={<OfficersPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </div>
    );
}

export default Layout;
