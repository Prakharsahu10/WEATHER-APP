import React from "react";
import type { Query } from "../types/weather";

interface City {
  id: number;
  name: string;
}

interface TopButtonsProps {
  setQuery: (query: Query) => void;
}

const TopButtons: React.FC<TopButtonsProps> = ({ setQuery }) => {
  const cities: City[] = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Sydney",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Paris",
    },
    {
      id: 5,
      name: "Toronto",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-8">
      {cities.map((city) => (
        <button
          key={city.id}
          className="group relative text-base md:text-lg text-white font-semibold bg-gradient-to-br from-white/15 to-white/5 hover:from-white/30 hover:to-white/15 backdrop-blur-md px-5 md:px-7 py-3 rounded-2xl border border-white/30 transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl active:scale-95 overflow-hidden"
          onClick={() => setQuery({ q: city.name })}
        >
          <span className="relative z-10">{city.name}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
