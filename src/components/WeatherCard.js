import React from 'react';

const WeatherCard = ({ data, onRefresh }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4 max-w-md w-full mx-auto transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {name}, {sys.country}
          </h2>
          <p className="text-gray-500 dark:text-gray-300">{new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={onRefresh}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
          title="Refresh"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center mt-4">
        <img src={iconUrl} alt={weather[0].description} className="w-16 h-16" />
        <div className="ml-4">
          <h3 className="text-4xl font-bold">{Math.round(main.temp)}°C</h3>
          <p className="text-lg capitalize">{weather[0].description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
          <p className="text-gray-500 text-sm dark:text-gray-400">Feels Like</p>
          <p className="text-lg font-semibold">{Math.round(main.feels_like)}°C</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
          <p className="text-gray-500 text-sm dark:text-gray-400">Humidity</p>
          <p className="text-lg font-semibold">{main.humidity}%</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
          <p className="text-gray-500 text-sm dark:text-gray-400">Wind Speed</p>
          <p className="text-lg font-semibold">{(wind.speed * 3.6).toFixed(1)} km/h</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-700">
          <p className="text-gray-500 text-sm dark:text-gray-400">Pressure</p>
          <p className="text-lg font-semibold">{main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
