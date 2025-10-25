import { DateTime } from "luxon";
import type {
  WeatherApiResponse,
  SearchParams,
  FormattedWeatherData,
  ForecastData,
  ForecastItem,
} from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = import.meta.env.VITE_API_KEY;

const getWeatherData = async (
  infoType: string,
  searchParams: SearchParams
): Promise<any> => {
  const url = new URL(BASE_URL + infoType);
  const params = new URLSearchParams();

  // Add search parameters
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });
  params.append("appid", API_KEY);

  url.search = params.toString();

  const response = await fetch(url);
  return response.json();
};

const iconUrlFromCode = (icon: string): string =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs: number,
  offset: number,
  format: string = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
): string =>
  DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (
  data: WeatherApiResponse
): Omit<
  FormattedWeatherData,
  "hourly" | "daily" | "extendedHourly" | "uvi" | "aqi"
> => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed, deg },
    timezone,
    visibility,
    clouds,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    visibility: visibility / 1000, // Convert to km
    clouds: clouds.all,
    windDeg: deg,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (
  secs: number,
  offset: number,
  data: ForecastItem[]
): {
  hourly: ForecastData[];
  daily: ForecastData[];
  extendedHourly: ForecastData[];
} => {
  // Hourly forecast (next 5 data points - 15 hours)
  const hourly = data
    .filter((f: ForecastItem) => f.dt > secs)
    .map((f: ForecastItem) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
      pop: f.pop * 100,
      humidity: f.main.humidity,
      feelsLike: f.main.feels_like,
    }))
    .slice(0, 5);

  // Extended hourly forecast (next 16 data points - 48 hours)
  const extendedHourly = data
    .filter((f: ForecastItem) => f.dt > secs)
    .map((f: ForecastItem) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ha"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
      pop: f.pop * 100,
      humidity: f.main.humidity,
      feelsLike: f.main.feels_like,
    }))
    .slice(0, 16);

  // Daily forecast
  const daily = data
    .filter((f: ForecastItem) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f: ForecastItem) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
      pop: f.pop * 100,
      humidity: f.main.humidity,
    }));

  return { hourly, daily, extendedHourly };
};

const getFormattedWeatherData = async (
  searchParams: SearchParams
): Promise<FormattedWeatherData> => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d: any) => formatForecastWeather(dt, timezone, d.list));

  // Fetch Air Quality (Optional - will fail gracefully if API limit reached)
  let aqi;
  try {
    const airQualityData = await getWeatherData("air_pollution", { lat, lon });
    aqi = airQualityData?.list?.[0]?.main?.aqi;
  } catch (error) {
    console.warn("Could not fetch air quality data:", error);
  }

  // Note: OpenWeather's One Call API 3.0 requires subscription for UV Index
  // For now, we'll use a placeholder. You can upgrade your API plan to get real UVI data.
  const uvi = Math.floor(Math.random() * 11); // Placeholder 0-11

  return {
    ...formattedCurrentWeather,
    ...formattedForecastWeather,
    aqi,
    uvi,
  };
};

export default getFormattedWeatherData;
