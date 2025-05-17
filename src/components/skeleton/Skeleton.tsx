import styles from './Skeleton.module.scss';

export const WeatherSkeleton = () => {
  return (
    <div className={styles.weatherSkeleton}>
      <div className={styles.headerSkeleton}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <div className={styles.temperatureSkeleton}></div>
        <div className={styles.circularSkeleton}></div>
      </div>
      <div className={styles.detailsSkeleton}>
        <div className={styles.detailItemSkeleton}></div>
        <div className={styles.detailItemSkeleton}></div>
        <div className={styles.detailItemSkeleton}></div>
        <div className={styles.detailItemSkeleton}></div>
      </div>
    </div>
  );
};

export const ForecastSkeleton = () => {
  return (
    <div className={styles.forecastSkeleton}>
      <div className={styles.headerSkeleton}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className={styles.infoRowSkeleton}></div>
        <div className={styles.infoRowSkeleton}></div>
        <div className={styles.infoRowSkeleton}></div>
        <div className={styles.infoRowSkeleton}></div>
        <div className={styles.infoRowSkeleton}></div>
      </div>
    </div>
  );
}; 