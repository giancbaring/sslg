
import React from 'react';
import { news } from '../data/news';
import type { NewsArticle } from '../data/news';

const NewsFeed: React.FC = () => {
  return (
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {news.map((article: NewsArticle, index: number) => (
          <div key={article.id} className={index < news.length - 1 ? 'border-b pb-4' : ''}>
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-gray-600 mt-1">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
