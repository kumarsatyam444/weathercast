import axios from 'axios';

const API_KEY = "41aaf9fc235678ade30465fdd494f609";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch current weather data
export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch 5-day forecast data
export const fetchForecastData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
