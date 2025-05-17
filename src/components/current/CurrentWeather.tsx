import { FiDroplet, FiWind, FiEye, FiSunrise, FiSunset, FiThermometer } from 'react-icons/fi';
import type { CurrentWeatherData } from '../../types/weather';
import { getWeatherIconUrl, convertVisibilityToKm, formatTemperature } from '../../utils/weatherUtils';
import { formatDate } from '../../utils/dateUtils';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  if (!data) return null;

  const { 
    name, 
    sys, 
    main, 
    weather, 
    wind,
    visibility,
    dt
  } = data;

  return (
    <div className={styles.currentWeatherContainer}>
      <div className={styles.weatherHeader}>
        <div className={styles.locationInfo}>
          <h2>{name}, {sys.country}</h2>
          <div className={styles.date}>{formatDate(dt)}</div>
        </div>
      </div>

      <div className={styles.weatherMain}>
        <div className={styles.temperatureContainer}>
          <div className={styles.temperature}>{formatTemperature(main.temp)}°C</div>
          <div className={styles.weatherIcon}>
            <img 
              src={getWeatherIconUrl(weather[0].icon)} 
              alt={weather[0].description} 
            />
          </div>
        </div>

        <div className={styles.weatherDescription}>
          <div className={styles.description}>{weather[0].description}</div>
          <div className={styles.feelsLike}>Feels like: {formatTemperature(main.feels_like)}°C</div>
        </div>
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiThermometer /></div>
          <div className={styles.detailLabel}>Min/Max Temperature</div>
          <div className={styles.detailValue}>
            {formatTemperature(main.temp_min)}°C / {formatTemperature(main.temp_max)}°C
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiDroplet /></div>
          <div className={styles.detailLabel}>Humidity</div>
          <div className={styles.detailValue}>{main.humidity}%</div>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiWind /></div>
          <div className={styles.detailLabel}>Wind</div>
          <div className={styles.detailValue}>{wind.speed} m/s</div>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiEye /></div>
          <div className={styles.detailLabel}>Visibility</div>
          <div className={styles.detailValue}>{convertVisibilityToKm(visibility)} km</div>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiSunrise /></div>
          <div className={styles.detailLabel}>Sunrise</div>
          <div className={styles.detailValue}>
            {new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.detailIcon}><FiSunset /></div>
          <div className={styles.detailLabel}>Sunset</div>
          <div className={styles.detailValue}>
            {new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 