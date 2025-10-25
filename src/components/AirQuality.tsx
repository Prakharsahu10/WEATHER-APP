import React from "react";
import { MdAir } from "react-icons/md";

interface AirQualityProps {
  aqi?: number;
}

const AirQuality: React.FC<AirQualityProps> = ({ aqi }) => {
  const getAQILevel = (
    aqi: number
  ): { level: string; color: string; emoji: string; description: string } => {
    switch (aqi) {
      case 1:
        return {
          level: "Good",
          color: "from-green-400 to-green-600",
          emoji: "😊",
          description: "Air quality is great!",
        };
      case 2:
        return {
          level: "Fair",
          color: "from-lime-400 to-lime-600",
          emoji: "🙂",
          description: "Air quality is acceptable",
        };
      case 3:
        return {
          level: "Moderate",
          color: "from-yellow-400 to-yellow-600",
          emoji: "😐",
          description: "Sensitive groups may be affected",
        };
      case 4:
        return {
          level: "Poor",
          color: "from-orange-400 to-orange-600",
          emoji: "😷",
          description: "Everyone may experience health effects",
        };
      case 5:
        return {
          level: "Very Poor",
          color: "from-red-400 to-red-600",
          emoji: "🤢",
          description: "Health alert: everyone may be affected",
        };
      default:
        return {
          level: "Unknown",
          color: "from-gray-400 to-gray-600",
          emoji: "❓",
          description: "Data not available",
        };
    }
  };

  const aqiValue = aqi || 0;
  const { level, color, emoji, description } = getAQILevel(aqiValue);
  const percentage = aqiValue ? (aqiValue / 5) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <MdAir size={28} className="text-cyan-300" />
          Air Quality
        </h3>
        <span className="text-3xl">{emoji}</span>
      </div>

      {/* AQI Bar */}
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 shadow-lg`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* AQI Level Info */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          {level}
        </span>
        <span className="text-xs text-white/70">{description}</span>
      </div>

      {aqi === undefined && (
        <p className="text-xs text-white/50 mt-2 text-center">
          AQI data unavailable
        </p>
      )}
    </div>
  );
};

export default AirQuality;
