import { useState, useCallback, useEffect } from 'react';
import type { CurrentWeatherData, ForecastData, WeatherError } from './types/weather';
import { getCurrentWeather, getForecast } from './api/weatherApi';
import { addToSearchHistory } from './utils/storageUtils';
import { getCurrentLocation, getCityFromCoordinates, getDefaultCity } from './utils/geolocation';
import { getQueryParam, setQueryParam } from './utils/urlUtils';
import Search from './components/search/Search';
import CurrentWeather from './components/current/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import { WeatherSkeleton, ForecastSkeleton } from './components/skeleton/Skeleton';
import styles from './styles/App.module.scss';

const CITY_PARAM = 'city';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');

  const handleSearch = useCallback(async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('searchCity', searchCity);

      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(searchCity),
        getForecast(searchCity),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      addToSearchHistory(searchCity);
      setCity(searchCity);
      
      setQueryParam(CITY_PARAM, searchCity);
      
    } catch (err) {
      const weatherError = err as WeatherError;
      setError(`Error: ${weatherError.message || 'Unable to fetch weather data'}`);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      
      const cityParam = getQueryParam(CITY_PARAM);
      
      if (cityParam) {
        await handleSearch(cityParam);
      } else {
        try {
          const geoResult = await getCurrentLocation();
          
          if (geoResult.coordinates) {
            const { latitude, longitude } = geoResult.coordinates;
            const cityName = await getCityFromCoordinates(latitude, longitude);
            await handleSearch(cityName);
          } else {
            await handleSearch(getDefaultCity());
          }
        } catch (error) {
          console.error('Error fetching user location:', error);
          await handleSearch(getDefaultCity());
        }
      }
    };

    init();
  }, [handleSearch]);

  const renderWeatherContent = () => {
    if (error) {
      return <div className={styles.errorMessage}>{error}</div>;
    }
    
    return (
      <>
        {loading || !currentWeather ? (
          <div className={styles.weatherCard}>
            <WeatherSkeleton />
          </div>
        ) : (
          <div className={styles.weatherCard}>
            <CurrentWeather data={currentWeather} />
          </div>
        )}
        
        {loading || !forecast ? (
          <div className={styles.forecastCard}>
            <ForecastSkeleton />
          </div>
        ) : (
          <div className={styles.forecastCard}>
            <Forecast data={forecast} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Weather App</h1>
        {city && <p className={styles.currentCity}>Current city: {city}</p>}
      </header>
      
      <main className={styles.mainContent}>
        <Search onSearch={handleSearch} error={error} />
        {renderWeatherContent()}
      </main>
    </div>
  );
};

export default App; 