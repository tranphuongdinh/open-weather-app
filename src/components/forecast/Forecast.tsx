import type { ForecastData, DailyForecast, ForecastItem } from '../../types/weather';
import { groupForecastByDay, getWeatherIconUrl, formatTemperature } from '../../utils/weatherUtils';
import { formatForecastDate, getDayFromTimestamp } from '../../utils/dateUtils';
import styles from './Forecast.module.scss';

interface ForecastProps {
  data: ForecastData;
}

const ForecastDayItem = ({ item }: { item: ForecastItem }) => {
  return (
    <div className={styles.forecastItem}>
      <div className={styles.forecastTime}>
        {formatForecastDate(item.dt_txt)}
      </div>
      <div className={styles.forecastIcon}>
        <img 
          src={getWeatherIconUrl(item.weather[0].icon)} 
          alt={item.weather[0].description} 
        />
      </div>
      <div className={styles.forecastTemp}>
        <div className={styles.minTemp}>
          <div className={styles.label}>Min</div>
          <div className={styles.value}>{formatTemperature(item.main.temp_min)}°C</div>
        </div>
        <div className={styles.maxTemp}>
          <div className={styles.label}>Max</div>
          <div className={styles.value}>{formatTemperature(item.main.temp_max)}°C</div>
        </div>
      </div>
      <div className={styles.forecastDescription}>
        {item.weather[0].description}
      </div>
    </div>
  );
};

const ForecastDay = ({ day }: { day: DailyForecast }) => {
  return (
    <div className={styles.forecastDay}>
      <h3 className={styles.dayHeader}>
        {getDayFromTimestamp(day.items[0].dt)}
      </h3>
      <div className={styles.forecastItems}>
        {day.items.map((item) => (
          <ForecastDayItem key={item.dt} item={item} />
        ))}
      </div>
    </div>
  );
};

const Forecast = ({ data }: ForecastProps) => {
  if (!data) return null;
  
  const forecastByDay = groupForecastByDay(data);
  
  return (
    <div className={styles.forecastContainer}>
      <h2 className={styles.forecastTitle}>5-Day Forecast</h2>
      <div className={styles.forecastList}>
        {forecastByDay.map((day) => (
          <ForecastDay key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast; 