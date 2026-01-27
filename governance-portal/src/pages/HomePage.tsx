
import React from 'react';
import Hero from '../components/Hero';
import NewsFeed from '../components/NewsFeed';
import UpcomingEvents from '../components/UpcomingEvents';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsFeed />
          <UpcomingEvents />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
