import React from "react";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import UVIndex from "./components/UVIndex";
import AirQuality from "./components/AirQuality";
import ExtendedHourlyForecast from "./components/ExtendedHourlyForecast";
import AdditionalDetails from "./components/AdditionalDetails";
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
    toast.info(
      `🔍 Fetching weather data for ${capitalizeFirstLetter(cityName)}...`
    );
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(
        `✨ Weather data loaded for ${data.name}, ${data.country}!`
      );
      setWeather(data);
      console.log(data);
    } catch (error) {
      toast.error("❌ Failed to fetch weather data. Please try again.");
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
      className={`min-h-screen bg-gradient-to-br ${formatBackground()} py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Glass morphism container with enhanced styling */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl shadow-3xl border border-white/20 p-6 md:p-10 transition-all duration-500 hover:shadow-glow animate-fade-in">
          {/* Header with logo/title */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-block mb-4">
              <div className="text-6xl md:text-7xl animate-float">☁️</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                Weather Dashboard
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p>Real-time weather information at your fingertips</p>
            </div>
          </div>

          <TopButtons setQuery={setQuery} />
          <Input setQuery={setQuery} setUnits={setUnits} />

          {weather && (
            <div className="mt-8 space-y-6 animate-slide-up">
              <TimeAndLocation weather={weather} />
              <TempAndDetails weather={weather} units={units} />

              {/* UV Index and Air Quality Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weather.uvi !== undefined && <UVIndex uvi={weather.uvi} />}
                <AirQuality aqi={weather.aqi} />
              </div>

              {/* Additional Weather Details */}
              <AdditionalDetails
                pressure={weather.pressure}
                visibility={weather.visibility}
                clouds={weather.clouds}
                windDeg={weather.windDeg}
              />

              {/* Extended 48-Hour Forecast */}
              {weather.extendedHourly && weather.extendedHourly.length > 0 && (
                <ExtendedHourlyForecast data={weather.extendedHourly} />
              )}

              {/* 3-Hour Step Forecast */}
              {weather.hourly && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Forecast
                    title="3 hour step forecast"
                    data={weather.hourly}
                  />
                </div>
              )}

              {/* Daily Forecast */}
              {weather.daily && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Forecast title="daily forecast" data={weather.daily} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        position="top-right"
        className="mt-16"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />
    </div>
  );
};

export default App;
