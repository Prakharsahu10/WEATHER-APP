import { DateTime } from "luxon";
import type {
  WeatherApiResponse,
  SearchParams,
  FormattedWeatherData,
  ForecastData,
  ForecastItem,
} from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "aa207f5460b8160973e304568cf53234";

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
): Omit<FormattedWeatherData, "hourly" | "daily"> => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
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
): { hourly: ForecastData[]; daily: ForecastData[] } => {
  console.log(secs);
  //hourly
  const hourly = data
    .filter((f: ForecastItem) => f.dt > secs)
    .map((f: ForecastItem) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  //daily
  const daily = data
    .filter((f: ForecastItem) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f: ForecastItem) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
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

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
