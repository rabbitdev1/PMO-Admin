import React, { useState, useEffect } from "react";

function CountdownTimer({ expired, onResponse, type }) {
  const startTime = new Date();
  const endTime = new Date(expired);

  // Calculate the initial remaining time
  let initialRemainingTime = endTime - startTime;
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [remainingTime, setRemainingTime] = useState(
    formatTime(initialRemainingTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      initialRemainingTime -= 1000; // Decrement the remaining time by 1 second
      const newTime = formatTime(initialRemainingTime);
      setRemainingTime(newTime);

      // Call onResponse here with the updated time
      onResponse(
        `${String(newTime.hours).padStart(2, "0")}:${String(newTime.minutes).padStart(2, "0")}:${String(newTime.seconds).padStart(2, "0")}`,
      );

      // When the countdown reaches zero, stop the interval
      if (initialRemainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onResponse]);

  return type === 1 ? (
    <div className="flex flex-row gap-1 text-base ">
      <div className="flex flex-row gap-2 rounded-lg">
        <span className="text-darkColor font-semibold text-center line-clamp-1">
          {String(remainingTime.hours).padStart(2, "0")} :
        </span>
        <span className="text-darkColor  font-semibold text-center line-clamp-1">
          {String(remainingTime.minutes).padStart(2, "0")} :
        </span>
        <span className="text-darkColor  font-semibold text-center line-clamp-1">
          {String(remainingTime.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-row gap-1">
      <div className="flex flex-row gap-2 p-3 py-2 my-2 bg-gradient-to-bl from-[#0185FF] to-[#ffdc05] rounded-lg">
        <span className="text-darkColor sm:text-md text-sm font-semibold text-center line-clamp-2">
          {String(remainingTime.days).padStart(2, "0")} h
        </span>
      </div>
      <div className="flex flex-row gap-2 p-3 py-2 my-2 bg-gradient-to-bl from-[#0185FF] to-[#ffdc05] rounded-lg">
        <span className="text-darkColor sm:text-md text-sm font-semibold text-center line-clamp-2">
          {String(remainingTime.hours).padStart(2, "0")} j
        </span>
      </div>
      <div className="flex flex-row gap-2 p-3 py-2 my-2 bg-gradient-to-bl from-[#0185FF] to-[#ffdc05] rounded-lg">
        <span className="text-darkColor sm:text-md text-sm  font-semibold text-center line-clamp-2">
          {String(remainingTime.minutes).padStart(2, "0")} m
        </span>
      </div>

      <div className="flex flex-row gap-2 p-3 py-2 my-2 bg-gradient-to-bl from-[#0185FF] to-[#ffdc05] rounded-lg">
        <span className="text-darkColor sm:text-md text-sm font-semibold text-center line-clamp-2">
          {String(remainingTime.seconds).padStart(2, "0")} d
        </span>
      </div>
    </div>
  );
}

export default CountdownTimer;
