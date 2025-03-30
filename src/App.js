import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import RecentSearches from './components/RecentSearches';
import ForecastCard from './components/ForecastCard';
import ThemeToggle from './components/ThemeToggle';
import useWeather from './hooks/useWeather';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  
  const {
    weatherData,
    forecastData,
    loading,
    error,
    recentSearches,
    fetchData,
    refreshWeather
  } = useWeather();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen py-8 px-4 transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Weather Forecast App
        </h1>
        
        <div className="flex justify-center mb-6">
          <SearchBar onSearch={fetchData} />
        </div>
        
        <RecentSearches searches={recentSearches} onSelect={fetchData} />
        
        {loading && <Loader />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && !error && (
          <WeatherCard data={weatherData} onRefresh={refreshWeather} />
        )}
        
        {forecastData && !loading && !error && (
          <ForecastCard data={forecastData} />
        )}
      </div>
      
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
