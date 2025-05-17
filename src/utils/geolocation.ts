interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationResult {
  coordinates?: Coordinates;
  error?: string;
}

const DEFAULT_CITY = 'Singapore';

export const getCurrentLocation = (): Promise<GeolocationResult> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      resolve({ error: 'Geolocation not supported' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
      },
      (error) => {
        console.log('Geolocation error:', error.message);
        resolve({ error: error.message });
      },
      { 
        enableHighAccuracy: false, 
        timeout: 5000, 
        maximumAge: 0 
      }
    );
  });
};

export const getDefaultCity = (): string => {
  return DEFAULT_CITY;
};

export const getCityFromCoordinates = async (
  latitude: number, 
  longitude: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=1f5b7f5451c8043db86577b9f1873729`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch city name');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return data[0].name;
    } else {
      return DEFAULT_CITY;
    }
  } catch (error) {
    console.error('Error getting city from coordinates:', error);
    return DEFAULT_CITY;
  }
}; 