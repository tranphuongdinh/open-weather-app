export const getQueryParam = (paramName: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};

export const setQueryParam = (paramName: string, value: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, value);
  
  window.history.pushState({}, '', url.toString());
};

export const removeQueryParam = (paramName: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.delete(paramName);
  
  window.history.pushState({}, '', url.toString());
}; 