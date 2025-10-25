import React from "react";
import type { FormattedWeatherData } from "../types/weather";

interface TimeAndLocationProps {
  weather: Pick<
    FormattedWeatherData,
    "formattedLocalTime" | "name" | "country"
  >;
}

const TimeAndLocation: React.FC<TimeAndLocationProps> = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="text-center space-y-5 py-8">
      <div className="flex items-center justify-center">
        <div className="relative inline-block">
          <p className="text-lg md:text-xl font-light text-white/90 tracking-wide backdrop-blur-sm bg-white/5 px-6 py-2 rounded-full border border-white/20">
            {formattedLocalTime}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
            {name},{" "}
            <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              {country}
            </span>
          </h2>
          <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndLocation;
