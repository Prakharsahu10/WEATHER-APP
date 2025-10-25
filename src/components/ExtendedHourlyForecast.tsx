import React from "react";
import type { ForecastData } from "../types/weather";
import { WiRaindrop } from "react-icons/wi";

interface ExtendedHourlyForecastProps {
  data: ForecastData[];
}

const ExtendedHourlyForecast: React.FC<ExtendedHourlyForecastProps> = ({
  data,
}) => {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-5">
        <div className="relative">
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mr-4 shadow-glow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm opacity-50"></div>
        </div>
        <p className="text-white font-bold text-lg uppercase tracking-widest">
          48-Hour Forecast
        </p>
      </div>

      {/* Scrollable Hourly Forecast */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
          {data.map((d, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md px-4 py-5 rounded-2xl border border-white/20 transition-all duration-300 hover:from-white/25 hover:to-white/10 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden min-w-[90px]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 transition-all duration-300 rounded-2xl"></div>

              <p className="font-semibold text-xs text-white/80 mb-2 group-hover:text-white transition-colors uppercase tracking-wide relative z-10">
                {d.title}
              </p>

              <div className="relative z-10 my-2">
                <img
                  src={d.icon}
                  alt="weather icon"
                  className="w-12 h-12 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <p className="font-black text-base text-white mb-2 group-hover:scale-110 transition-transform relative z-10">
                {`${d.temp.toFixed()}°`}
              </p>

              {/* Precipitation probability */}
              {d.pop !== undefined && d.pop > 0 && (
                <div className="flex items-center gap-1 text-xs text-cyan-300 relative z-10">
                  <WiRaindrop size={16} />
                  <span>{d.pop.toFixed()}%</span>
                </div>
              )}

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-3">
        <p className="text-xs text-white/50">← Scroll for more →</p>
      </div>
    </div>
  );
};

export default ExtendedHourlyForecast;
