import React from "react";
import type { ForecastData } from "../types/weather";

interface ForecastProps {
  title: string;
  data: ForecastData[];
}

const Forecast: React.FC<ForecastProps> = ({ title, data }) => {
  return (
    <div className="py-4">
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mr-4 shadow-glow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm opacity-50"></div>
        </div>
        <p className="text-white font-bold text-lg uppercase tracking-widest">
          {title}
        </p>
      </div>

      <div className="grid grid-cols-3 md:flex md:flex-row items-stretch justify-between gap-3 md:gap-4">
        {data.map((d, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md px-3 md:px-5 py-5 md:py-6 rounded-2xl border border-white/20 transition-all duration-300 hover:from-white/25 hover:to-white/10 hover:scale-110 hover:shadow-2xl cursor-pointer overflow-hidden"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 transition-all duration-300 rounded-2xl"></div>

            <p className="font-semibold text-xs md:text-sm text-white/80 mb-3 group-hover:text-white transition-colors uppercase tracking-wide relative z-10">
              {d.title}
            </p>

            <div className="relative z-10 my-2">
              <img
                src={d.icon}
                alt="weather icon"
                className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl group-hover:scale-125 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <p className="font-black text-base md:text-xl text-white mt-3 group-hover:scale-110 transition-transform relative z-10">
              {`${d.temp.toFixed()}°`}
            </p>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 blur-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
