import React from "react";
import { WiBarometer, WiCloud } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { BsCompass } from "react-icons/bs";

interface AdditionalDetailsProps {
  pressure: number;
  visibility: number;
  clouds: number;
  windDeg: number;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  pressure,
  visibility,
  clouds,
  windDeg,
}) => {
  const getWindDirection = (deg: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      id: 1,
      icon: WiBarometer,
      title: "Pressure",
      value: `${pressure} hPa`,
      color: "text-purple-300",
    },
    {
      id: 2,
      icon: MdVisibility,
      title: "Visibility",
      value: `${visibility.toFixed(1)} km`,
      color: "text-blue-300",
    },
    {
      id: 3,
      icon: WiCloud,
      title: "Cloud Cover",
      value: `${clouds}%`,
      color: "text-gray-300",
    },
    {
      id: 4,
      icon: BsCompass,
      title: "Wind Direction",
      value: getWindDirection(windDeg),
      color: "text-cyan-300",
      rotate: windDeg,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map(({ id, icon: Icon, title, value, color, rotate }) => (
        <div
          key={id}
          className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <Icon
                size={36}
                className={`${color} group-hover:scale-110 transition-transform`}
                style={
                  rotate !== undefined
                    ? { transform: `rotate(${rotate}deg)` }
                    : {}
                }
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p className="text-xs text-white/70 uppercase tracking-wider mb-2">
              {title}
            </p>
            <p className="text-lg font-bold text-white">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdditionalDetails;
