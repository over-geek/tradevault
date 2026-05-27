"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TVNoise from "@/components/ui/tv-noise";
import { WidgetData, TimezoneData, LocationData } from "@/types/dashboard";
import Image from "next/image";

interface WidgetProps {
  widgetData: WidgetData;
  timezones: TimezoneData[];
}

export default function Widget({ widgetData, timezones }: WidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneData>(
    timezones.find(tz => tz.name === widgetData.timezone) || timezones[0]
  );
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(
    selectedTimezone?.locations.find(loc => `${loc.city}, ${loc.country}` === widgetData.location) || 
    selectedTimezone?.locations[0]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (date: Date, offset: string) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const offsetHours = parseInt(offset);
    const timezoneTime = new Date(utc + (offsetHours * 3600000));
    return timezoneTime;
  };

  const formatTime = (date: Date) => {
    const timezoneTime = getTimeInTimezone(date, selectedTimezone.offset);
    return timezoneTime.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const timezoneTime = getTimeInTimezone(date, selectedTimezone.offset);
    const dayOfWeek = timezoneTime.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const restOfDate = timezoneTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return { dayOfWeek, restOfDate };
  };

  const handleTimezoneChange = (timezone: TimezoneData) => {
    setSelectedTimezone(timezone);
    setSelectedLocation(timezone.locations[0]);
  };

  const handleLocationChange = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const dateInfo = formatDate(currentTime);

  return (
    <Card className="w-full aspect-[2] relative overflow-hidden">
      <TVNoise opacity={0.6} intensity={0.4} speed={30} className="z-30" />
      <CardContent className="bg-accent/30 flex-1 flex flex-col justify-between text-sm font-medium uppercase relative z-10">
        <div className="flex justify-between items-center">
          <span className="opacity-50">{dateInfo.dayOfWeek}</span>
          <span>{dateInfo.restOfDate}</span>
        </div>
        <div className="text-center">
          <div className="text-5xl font-display" suppressHydrationWarning>
            {formatTime(currentTime)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="opacity-50">{selectedLocation.temperature}</span>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:opacity-70 transition-opacity">
                {selectedLocation.city}, {selectedLocation.country}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" side="top" align="center">
              <div className="p-3">
                <div className="text-xs font-medium mb-3 opacity-70">SELECT LOCATION</div>
                <div className="space-y-2">
                  {selectedTimezone.locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationChange(location)}
                      className={`w-full text-left p-2 rounded text-xs hover:bg-accent transition-colors ${
                        selectedLocation.city === location.city ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="font-medium">{location.city}, {location.country}</div>
                      <div className="opacity-50">{location.temperature} • {location.weather}</div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Badge variant="secondary" className="bg-accent cursor-pointer hover:bg-accent/80 transition-colors">
                {selectedTimezone.name}
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" side="top" align="end">
              <div className="p-3">
                <div className="text-xs font-medium mb-3 opacity-70">SELECT TIMEZONE</div>
                <div className="space-y-1">
                  {timezones.map((timezone, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimezoneChange(timezone)}
                      className={`w-full text-left p-2 rounded text-xs hover:bg-accent transition-colors ${
                        selectedTimezone.name === timezone.name ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="font-medium">{timezone.name}</div>
                      <div className="opacity-50">{timezone.locations.length} locations</div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="absolute inset-0 -z-[1]">
          <Image
            src="/assets/pc_blueprint.gif"
            alt="logo"
            width={250}
            height={250}
            className="size-full object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}
