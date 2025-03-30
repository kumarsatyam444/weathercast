import React from 'react';

const RecentSearches = ({ searches, onSelect }) => {
  if (!searches.length) return null;

  return (
    <div className="mt-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
