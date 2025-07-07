import React from "react";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import type { Query, Units, FormattedWeatherData } from "./types/weather";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App: React.FC = () => {
  const [query, setQuery] = useState<Query>({ q: "ahmedabad" });
  const [units, setUnits] = useState<Units>("metric");
  const [weather, setWeather] = useState<FormattedWeatherData | null>(null);

  const getWeather = async (): Promise<void> => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name},${data.country}`);
      setWeather(data);
      console.log(data);
    } catch (error) {
      toast.error("Failed to fetch weather data");
      console.error(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = (): string => {
    if (!weather) return `from-cyan-600 to-blue-700`;
    const threshold = units === "metric" ? 30 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          {weather.hourly && <Forecast title="3 hour step forecast" data={weather.hourly} />}
          {weather.daily && <Forecast title="daily forecast" data={weather.daily} />}
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
