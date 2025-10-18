import { cn } from "@/lib/utils";
import { format, isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";

const SunIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MoonIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" fill="currentColor" />
  </svg>
);

const CloudIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export type WeatherAtLocation = {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  cityName?: string;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
};

function n(num: number): number {
  return Math.ceil(num);
}

export function Weather({
  weatherAtLocation,
}: {
  weatherAtLocation: WeatherAtLocation;
}) {
  const currentHigh = Math.max(
    ...weatherAtLocation.hourly.temperature_2m.slice(0, 24)
  );
  const currentLow = Math.min(
    ...weatherAtLocation.hourly.temperature_2m.slice(0, 24)
  );

  const isDay = isWithinInterval(new Date(weatherAtLocation.current.time), {
    start: new Date(weatherAtLocation.daily.sunrise[0]),
    end: new Date(weatherAtLocation.daily.sunset[0]),
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hoursToShow = isMobile ? 5 : 6;

  const currentTimeIndex = weatherAtLocation.hourly.time.findIndex(
    (time) => new Date(time) >= new Date(weatherAtLocation.current.time)
  );

  const displayTimes = weatherAtLocation.hourly.time.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow
  );
  const displayTemperatures = weatherAtLocation.hourly.temperature_2m.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow
  );

  const location = weatherAtLocation.cityName || 
    `${weatherAtLocation.latitude?.toFixed(1)}°, ${weatherAtLocation.longitude?.toFixed(1)}°`;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-6 rounded-3xl p-6 shadow-lg overflow-hidden backdrop-blur-sm",
        isDay && "bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600",
        !isDay && "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
      )}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/80 text-sm font-medium">
            {location}
          </div>
          <div className="text-white/60 text-xs">
            {format(new Date(weatherAtLocation.current.time), "MMM d, h:mm a")}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={cn("text-white/90", isDay && "text-yellow-200", !isDay && "text-blue-200")}>
              {isDay ? <SunIcon size={48} /> : <MoonIcon size={48} />}
            </div>
            <div className="text-white text-5xl font-light">
              {n(weatherAtLocation.current.temperature_2m)}
              <span className="text-2xl text-white/80">
                {weatherAtLocation.current_units.temperature_2m}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white/90 text-sm font-medium">
              H: {n(currentHigh)}°
            </div>
            <div className="text-white/70 text-sm">
              L: {n(currentLow)}°
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="text-white/80 text-sm mb-3 font-medium">
            Hourly Forecast
          </div>
          <div className="flex justify-between gap-2">
            {displayTimes.map((time, index) => {
              const hourTime = new Date(time);
              const isCurrentHour = hourTime.getHours() === new Date().getHours();
              
              return (
                <div 
                  className={cn(
                    "flex flex-col items-center gap-2 py-2 px-1 rounded-lg min-w-0 flex-1",
                    isCurrentHour && "bg-white/20"
                  )} 
                  key={time}
                >
                  <div className="text-white/70 text-xs font-medium">
                    {index === 0 ? "Now" : format(hourTime, "ha")}
                  </div>
                  
                  <div className={cn("text-white/60", isDay && "text-yellow-200", !isDay && "text-blue-200")}>
                    <CloudIcon size={20} />
                  </div>
                  
                  <div className="text-white text-sm font-medium">
                    {n(displayTemperatures[index])}°
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between text-white/60 text-xs mt-4">
          <div>Sunrise: {format(new Date(weatherAtLocation.daily.sunrise[0]), "h:mm a")}</div>
          <div>Sunset: {format(new Date(weatherAtLocation.daily.sunset[0]), "h:mm a")}</div>
        </div>
      </div>
    </div>
  );
}

