import React from 'react';

interface Document {
  name: string;
  date: string;
  url: string;
}

interface DocumentListProps {
  title: string;
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ title, documents }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="bg-white p-4 rounded-lg shadow-md">
        {documents.map((doc, index) => (
          <li key={index} className="border-b last:border-b-0">
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-3 hover:bg-gray-50">
              <span>{doc.name}</span>
              <span className="text-gray-500 text-sm">{doc.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
