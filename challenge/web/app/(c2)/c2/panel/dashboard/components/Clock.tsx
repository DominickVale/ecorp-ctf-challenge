"use client"
import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time: Date): string => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  return <span>{formatTime(time)}</span>;
};

export default Clock;
