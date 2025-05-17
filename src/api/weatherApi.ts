import axios from 'axios';
import type { CurrentWeatherData, ForecastData, WeatherError } from '../types/weather';

const API_KEY = 'your_open_weather_api_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const getCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  try {
    const response = await weatherApi.get<CurrentWeatherData>('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as WeatherError;
    }
    throw { cod: '500', message: 'Unknown error' };
  }
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  try {
    const response = await weatherApi.get<ForecastData>('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as WeatherError;
    }
    throw { cod: '500', message: 'Unknown error' };
  }
};

export default weatherApi; 