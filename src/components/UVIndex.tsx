import React from "react";
import { WiDaySunny } from "react-icons/wi";

interface UVIndexProps {
  uvi: number;
}

const UVIndex: React.FC<UVIndexProps> = ({ uvi }) => {
  const getUVLevel = (
    uv: number
  ): { level: string; color: string; description: string } => {
    if (uv <= 2)
      return {
        level: "Low",
        color: "from-green-400 to-green-600",
        description: "No protection needed",
      };
    if (uv <= 5)
      return {
        level: "Moderate",
        color: "from-yellow-400 to-yellow-600",
        description: "Protection required",
      };
    if (uv <= 7)
      return {
        level: "High",
        color: "from-orange-400 to-orange-600",
        description: "Protection essential",
      };
    if (uv <= 10)
      return {
        level: "Very High",
        color: "from-red-400 to-red-600",
        description: "Extra protection needed",
      };
    return {
      level: "Extreme",
      color: "from-purple-400 to-purple-600",
      description: "Stay inside if possible",
    };
  };

  const { level, color, description } = getUVLevel(uvi);
  const percentage = Math.min((uvi / 11) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          <WiDaySunny size={28} className="text-yellow-300" />
          UV Index
        </h3>
        <span className="text-white/80 text-sm font-medium">{uvi}</span>
      </div>

      {/* UV Bar */}
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 shadow-lg`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* UV Level Info */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          {level}
        </span>
        <span className="text-xs text-white/70">{description}</span>
      </div>
    </div>
  );
};

export default UVIndex;
