import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchForecastData } from '../utilities/api';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchData = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResult = await fetchWeatherData(cityName);
      setWeatherData(weatherResult);
      
      // Fetch forecast
      const forecastResult = await fetchForecastData(cityName);
      setForecastData(forecastResult);
      
      // Update recent searches
      updateRecentSearches(cityName);
      
      setCity(cityName);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(
        err.response?.status === 404
          ? 'City not found. Please check the spelling and try again.'
          : 'Failed to fetch weather data. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (cityName) => {
    setRecentSearches(prevSearches => {
      // Remove the city if it already exists
      const filteredSearches = prevSearches.filter(
        search => search.toLowerCase() !== cityName.toLowerCase()
      );
      
      // Add the city to the beginning and limit to 5 items
      return [cityName, ...filteredSearches].slice(0, 5);
    });
  };

  const refreshWeather = () => {
    if (city) {
      fetchData(city);
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    city,
    recentSearches,
    fetchData,
    refreshWeather
  };
};

export default useWeather;
