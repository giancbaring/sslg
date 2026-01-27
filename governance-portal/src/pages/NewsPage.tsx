
import React from 'react';
import { news } from '../data/news';
import type { NewsArticle } from '../data/news';

const NewsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">News & Announcements</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {news.map((article: NewsArticle) => (
          <div key={article.id} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">{article.title}</h2>
            <p className="text-gray-600 mt-2">{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
