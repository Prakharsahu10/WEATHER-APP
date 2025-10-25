# Weather App

A modern, responsive weather application built with React and TypeScript, featuring real-time weather data from OpenWeatherMap API.

## Features

- ⛅ Real-time weather information
- 🌡️ Temperature display in both Celsius and Fahrenheit
- 📍 Location-based weather (current location or search by city)
- 📊 5-day weather forecast
- 🌅 Sunrise and sunset times
- 💨 Wind speed and humidity data
- 🎨 Dynamic background based on temperature
- 📱 Responsive design

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Luxon** - Date and time handling
- **React Icons** - Beautiful icon library
- **React Toastify** - Toast notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy the example env file
cp .env.example .env
```

Then edit `.env` and add your OpenWeatherMap API key:

```env
VITE_API_KEY=your_openweathermap_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## TypeScript Features

This project is fully converted to TypeScript with:

- 🔒 **Type Safety** - All components, functions, and data structures are properly typed
- 📋 **Interface Definitions** - Comprehensive type definitions for weather data
- 🛡️ **Error Prevention** - Compile-time error checking
- 🔧 **Better Developer Experience** - Enhanced IntelliSense and autocomplete

### Key Type Definitions

- `WeatherApiResponse` - OpenWeatherMap API response structure
- `FormattedWeatherData` - Processed weather data for components
- `ForecastData` - Weather forecast item structure
- `SearchParams` - API search parameters
- `Query` - User search query structure
- `Units` - Temperature unit type ('metric' | 'imperial')

## Project Structure

```
src/
├── components/          # React components
│   ├── Forecast.tsx
│   ├── Input.tsx
│   ├── TempAndDetails.tsx
│   ├── TimeAndLocation.tsx
│   └── TopButtons.tsx
├── services/           # API services
│   └── weatherService.ts
├── types/              # TypeScript type definitions
│   └── weather.ts
├── App.tsx            # Main app component
├── main.tsx           # App entry point
├── index.css          # Global styles
└── App.css            # Component styles
```

## API Configuration

This app uses the OpenWeatherMap API.

### Getting Your API Key

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your API keys section
3. Generate a new API key (or use the default one provided)

### Setting Up the API Key

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace `your_api_key_here` with your actual API key:

   ```env
   VITE_API_KEY=your_actual_api_key_here
   ```

3. Restart the development server if it's already running

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## TypeScript Migration

This project was originally built in JavaScript and has been fully migrated to TypeScript. The migration includes:

- ✅ All `.js` and `.jsx` files converted to `.ts` and `.tsx`
- ✅ Comprehensive type definitions for all data structures
- ✅ Proper typing for all React components and props
- ✅ Type-safe API service layer
- ✅ TypeScript configuration optimized for React development
- ✅ Enhanced developer experience with better IntelliSense

The migration ensures better code quality, fewer runtime errors, and improved maintainability.
