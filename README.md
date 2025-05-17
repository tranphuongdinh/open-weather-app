# Weather App - React + TypeScript + Vite

A modern weather application built using React, TypeScript, and Vite that allows users to:

- View current weather conditions for any city
- See a multi-day weather forecast
- Automatically detect and display weather for the user's current location
- Search for weather in any location
- View recent search history

## Features

- **Current Weather Display**: Shows temperature, humidity, wind speed, and other weather conditions
- **5-Day Forecast**: Provides a detailed forecast for the upcoming days
- **Geolocation Support**: Automatically detects user location (with permission)
- **Search History**: Keeps track of recently searched locations
- **Responsive Design**: Works on both mobile and desktop devices
- **Query Parameter Support**: Allows direct linking to weather for specific cities

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios for API calls
- SASS for styling
- OpenWeatherMap API for weather data

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn or npm
- OpenWeatherMap API key (sign up at https://openweathermap.org/api)

### API Key Setup

Before running the application, you need to set up your OpenWeatherMap API key:

1. Create an account at [OpenWeatherMap](https://openweathermap.org/) if you don't have one
2. Generate an API key from your account dashboard
3. Open the file `src/api/weatherApi.ts`
4. Replace `'your_open_weather_api_key'` with your actual API key

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd weather-app

# Install dependencies
yarn install
# or
npm install
```

### Running the Application

```bash
# Start development server
yarn dev
# or
npm run dev
```

The application will be available at http://localhost:5173/

### Building for Production

```bash
# Build the project
yarn build
# or
npm run build

# Preview the production build
yarn preview
# or
npm run preview
```

## ESLint Configuration

This project includes a detailed ESLint configuration. To enable type-aware lint rules, update the configuration as described in the ESLint section below.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
