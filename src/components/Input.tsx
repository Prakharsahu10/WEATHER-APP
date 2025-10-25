import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import type { Query, Units } from "../types/weather";

interface InputProps {
  setQuery: (query: Query) => void;
  setUnits: (units: Units) => void;
}

const Input: React.FC<InputProps> = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState<string>("");

  const handleSearchClick = (): void => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
      <div className="flex flex-row w-full md:w-3/4 items-center space-x-3">
        <div className="relative flex-1 group">
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
            type="text"
            placeholder="Search by city..."
            className="w-full bg-white/95 backdrop-blur-md text-gray-800 text-lg font-medium px-6 py-4 rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:shadow-2xl placeholder:text-gray-400 transition-all duration-300 border border-white/30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
        </div>

        <button
          onClick={handleSearchClick}
          className="group relative bg-gradient-to-br from-white/25 to-white/10 hover:from-white/35 hover:to-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/40 cursor-pointer transition-all duration-300 ease-out hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl"
        >
          <BiSearch size={24} className="text-white relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <button
          onClick={handleLocationClick}
          className="group relative bg-gradient-to-br from-white/25 to-white/10 hover:from-white/35 hover:to-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/40 cursor-pointer transition-all duration-300 ease-out hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl"
        >
          <BiCurrentLocation size={24} className="text-white relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      <div className="relative flex flex-row items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md px-8 py-3.5 rounded-2xl border border-white/30 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl blur-lg"></div>
        <button
          className="relative text-xl md:text-2xl font-bold text-white transition-all duration-300 ease-out hover:scale-125 active:scale-95 hover:text-cyan-200"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <span className="relative text-xl md:text-2xl font-light text-white/50 mx-4">
          |
        </span>
        <button
          className="relative text-xl md:text-2xl font-bold text-white transition-all duration-300 ease-out hover:scale-125 active:scale-95 hover:text-cyan-200"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Input;
