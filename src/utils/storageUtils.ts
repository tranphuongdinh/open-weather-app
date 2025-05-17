import type { SearchHistory } from '../types/weather';

const SEARCH_HISTORY_KEY = 'weatherAppSearchHistory';

const encodeData = (data: string): string => {
  return btoa(data);
};

const decodeData = (encodedData: string): string => {
  try {
    return atob(encodedData);
  } catch (error) {
    console.error('Error decoding data:', error);
    return '';
  }
};

export const saveSearchHistory = (searchHistory: SearchHistory[]): void => {
  try {
    const serializedData = JSON.stringify(searchHistory);
    const encodedData = encodeData(serializedData);
    localStorage.setItem(SEARCH_HISTORY_KEY, encodedData);
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const getSearchHistory = (): SearchHistory[] => {
  try {
    const encodedData = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!encodedData) {
      return [];
    }
    
    const decodedData = decodeData(encodedData);
    return JSON.parse(decodedData);
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
};

export const addToSearchHistory = (city: string): SearchHistory[] => {
  try {
    const existingHistory = getSearchHistory();
    
    const filteredHistory = existingHistory.filter(item => item.city.toLowerCase() !== city.toLowerCase());
    
    const newHistoryItem: SearchHistory = {
      id: Date.now().toString(),
      city: city,
      timestamp: Date.now()
    };
    
    const updatedHistory = [newHistoryItem, ...filteredHistory].slice(0, 10);
    saveSearchHistory(updatedHistory);
    
    return updatedHistory;
  } catch (error) {
    console.error('Error adding to search history:', error);
    return getSearchHistory();
  }
};

export const removeFromSearchHistory = (id: string): SearchHistory[] => {
  try {
    const existingHistory = getSearchHistory();
    const updatedHistory = existingHistory.filter(item => item.id !== id);
    saveSearchHistory(updatedHistory);
    return updatedHistory;
  } catch (error) {
    console.error('Error removing from search history:', error);
    return getSearchHistory();
  }
}; 