import React from 'react';

const ForecastCard = ({ data }) => {
  if (!data) return null;

  // Group forecast data by day
  const groupByDay = (forecastList) => {
    const grouped = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    
    // Get daily averages
    return Object.keys(grouped).map(date => {
      const items = grouped[date];
      const temps = items.map(item => item.main.temp);
      const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
      
      // Get the most common weather condition
      const weatherCounts = {};
      items.forEach(item => {
        const weather = item.weather[0].main;
        weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
      });
      
      let mostCommonWeather = items[0].weather[0];
      let maxCount = 0;
      
      Object.keys(weatherCounts).forEach(weather => {
        if (weatherCounts[weather] > maxCount) {
          maxCount = weatherCounts[weather];
          mostCommonWeather = items.find(item => item.weather[0].main === weather).weather[0];
        }
      });
      
      return {
        date,
        avgTemp,
        weather: mostCommonWeather,
        icon: mostCommonWeather.icon
      };
    }).slice(0, 5); // Limit to 5 days
  };

  const dailyForecasts = groupByDay(data.list);

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4 dark:text-white">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center transition-transform hover:scale-105 dark:bg-gray-800 dark:text-white">
            <p className="font-semibold">{new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {new Date(forecast.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <img 
              src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} 
              alt={forecast.weather.description} 
              className="w-16 h-16 mx-auto"
            />
            <p className="text-2xl font-bold">{Math.round(forecast.avgTemp)}°C</p>
            <p className="text-sm capitalize">{forecast.weather.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
