// Weather API Types
export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherApiResponse {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Formatted Weather Types
export interface FormattedWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  name: string;
  country: string;
  sunrise: string;
  sunset: string;
  speed: number;
  details: string;
  icon: string;
  formattedLocalTime: string;
  dt: number;
  timezone: number;
  lat: number;
  lon: number;
  hourly?: ForecastData[];
  daily?: ForecastData[];
}

export interface ForecastData {
  temp: number;
  title: string;
  icon: string;
  date: string;
}

export interface SearchParams {
  q?: string;
  lat?: number;
  lon?: number;
  units?: "metric" | "imperial";
}

export interface Query {
  q?: string;
  lat?: number;
  lon?: number;
}

export type Units = "metric" | "imperial";
