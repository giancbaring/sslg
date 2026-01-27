
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import OfficersPage from './pages/OfficersPage';
import DocumentsPage from './pages/DocumentsPage';
import EventsPage from './pages/EventsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/officers" element={<OfficersPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
