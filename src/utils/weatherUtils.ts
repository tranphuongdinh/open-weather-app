import type { ForecastData, ForecastItem, DailyForecast } from '../types/weather';
import { getDateFromTimestamp } from './dateUtils';

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const convertVisibilityToKm = (visibility: number): string => {
  return (visibility / 1000).toFixed(1);
};

export const groupForecastByDay = (forecastData: ForecastData): DailyForecast[] => {
  const groupedByDay: Record<string, ForecastItem[]> = {};
  
  forecastData.list.forEach((item) => {
    const date = getDateFromTimestamp(item.dt);
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });
  
  return Object.entries(groupedByDay).map(([date, items]) => {
    const minTemp = Math.min(...items.map((item) => item.main.temp_min));
    const maxTemp = Math.max(...items.map((item) => item.main.temp_max));
    
    const middleIndex = Math.floor(items.length / 2);
    const representativeItem = items[middleIndex];
    
    return {
      date,
      items,
      minTemp,
      maxTemp,
      icon: representativeItem.weather[0].icon,
      description: representativeItem.weather[0].description,
    };
  });
};

export const formatTemperature = (temp: number): string => {
  return Math.round(temp).toString();
}; 