import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import type { FormattedWeatherData, Units } from "../types/weather";
import type { IconType } from "react-icons";

interface DetailItem {
  id: number;
  Icon: IconType;
  title: string;
  value: string;
}

interface TempAndDetailsProps {
  weather: Pick<
    FormattedWeatherData,
    | "details"
    | "icon"
    | "temp"
    | "temp_min"
    | "temp_max"
    | "sunrise"
    | "sunset"
    | "speed"
    | "humidity"
    | "feels_like"
  >;
  units: Units;
}

const TempAndDetails: React.FC<TempAndDetailsProps> = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails: DetailItem[] = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const horizontalDetails: DetailItem[] = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 my-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Weather description */}
      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <p className="text-xl md:text-2xl text-cyan-200 font-semibold tracking-wide capitalize relative z-10">
            {details}
          </p>
          <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
        </div>
      </div>

      {/* Main temperature display */}
      <div className="flex flex-col md:flex-row items-center justify-around py-6 gap-8">
        <div className="relative">
          <div className="animate-float">
            <img
              src={icon}
              alt="weather icon"
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl relative z-10"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl"></div>
        </div>

        <div className="text-center md:text-left relative">
          <p className="text-8xl md:text-9xl font-black text-white drop-shadow-2xl tracking-tight">
            {`${temp.toFixed()}°`}
          </p>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-2xl -z-10"></div>
        </div>

        <div className="flex flex-col space-y-4">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="group flex items-center bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 min-w-[200px] hover:from-white/25 hover:to-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="bg-cyan-400/20 p-2 rounded-lg mr-3 group-hover:bg-cyan-400/30 transition-colors">
                <Icon size={20} className="text-cyan-300" />
              </div>
              <span className="font-medium text-sm text-white/90">{`${title}:`}</span>
              <span className="font-bold text-sm ml-auto text-white">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional details */}
      <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-4 md:gap-6 py-8 border-t border-white/20 mt-6">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="group flex flex-col items-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            <div className="bg-gradient-to-br from-cyan-400/30 to-blue-500/30 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Icon size={28} className="text-white drop-shadow-lg" />
            </div>
            <p className="font-medium text-xs text-white/80 uppercase tracking-wider">
              {title}
            </p>
            <span className="font-bold text-base text-white mt-2">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
