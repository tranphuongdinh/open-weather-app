import { useState, useCallback, useRef, startTransition, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FiX, FiShare2 } from 'react-icons/fi';
import type { SearchHistory as SearchHistoryType } from '../../types/weather';
import { getSearchHistory, removeFromSearchHistory } from '../../utils/storageUtils';
import { getQueryParam } from '../../utils/urlUtils';
import styles from './Search.module.scss';

interface SearchProps {
  onSearch: (city: string) => void;
  error: string | null;
}

const Search = ({ onSearch, error }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<SearchHistoryType[]>(() => getSearchHistory());
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const cityParam = getQueryParam('city');
    if (cityParam) {
      setSearchTerm(cityParam);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (value.trim()) {
        startTransition(() => {
          onSearch(value.trim());
        });
      }
    }, 200);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleSelectHistory = useCallback((city: string) => {
    setSearchTerm(city);
    startTransition(() => {
      onSearch(city);
    });
  }, [onSearch]);

  const handleRemoveFromHistory = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updatedHistory = removeFromSearchHistory(id);
    setHistory(updatedHistory);
  }, []);

  const handleShareLink = useCallback(() => {
    const currentUrl = window.location.href;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setShowShareTooltip(true);
          setTimeout(() => setShowShareTooltip(false), 2000);
        })
        .catch(err => {
          console.error('Could not copy URL: ', err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      } catch (err) {
        console.error('Could not copy URL: ', err);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.searchInput}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter city name (example: Ha Noi, Ho Chi Minh City, London)"
            aria-label="Search for a city"
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
      </form>

      <div className={styles.shareContainer}>
        <button 
          className={styles.shareButton} 
          onClick={handleShareLink}
          aria-label="Share current weather"
        >
          <FiShare2 /> Share this weather
        </button>
        {showShareTooltip && <div className={styles.shareTooltip}>Link copied to clipboard!</div>}
      </div>

      {history.length > 0 && (
        <div className={styles.historyContainer}>
          <h3>Search History</h3>
          <div className={styles.historyList}>
            {history.map((item) => (
              <div
                key={item.id}
                className={styles.historyItem}
                onClick={() => handleSelectHistory(item.city)}
              >
                <span className={styles.historyText}>{item.city}</span>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => handleRemoveFromHistory(e, item.id)}
                  aria-label={`Delete ${item.city} from history`}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search; 