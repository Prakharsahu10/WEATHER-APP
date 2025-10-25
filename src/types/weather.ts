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
  pressure: number;
  visibility: number;
  clouds: number;
  windDeg: number;
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
  uvi?: number;
  aqi?: number;
  hourly?: ForecastData[];
  daily?: ForecastData[];
  extendedHourly?: ForecastData[];
}

export interface ForecastData {
  temp: number;
  title: string;
  icon: string;
  date: string;
  pop?: number;
  humidity?: number;
  feelsLike?: number;
  tempMin?: number;
  tempMax?: number;
  description?: string;
}

export interface DailyForecastData extends ForecastData {
  tempMin: number;
  tempMax: number;
  description: string;
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

// Air Quality Types
export interface AirQualityResponse {
  coord: Coordinates;
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

// One Call API Type for UV Index
export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    weather: WeatherCondition[];
    pop: number;
  }>;
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
      day: number;
    };
    weather: WeatherCondition[];
    pop: number;
  }>;
}
