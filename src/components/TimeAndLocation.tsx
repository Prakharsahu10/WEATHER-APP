import React from 'react'
import type { FormattedWeatherData } from '../types/weather';

interface TimeAndLocationProps {
  weather: Pick<FormattedWeatherData, 'formattedLocalTime' | 'name' | 'country'>;
}

const TimeAndLocation: React.FC<TimeAndLocationProps> = ({ 
  weather: { formattedLocalTime, name, country }
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6 text-white">
        <p className="text-xl font-extralight">{formattedLocalTime}
        </p>
      </div>
      <div className="flex items-center justify-center my-3 text-white">
        <p className="text-3xl font-medium">{`${name},${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation
