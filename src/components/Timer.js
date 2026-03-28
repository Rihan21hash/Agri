import React, { useEffect, useState } from "react";

function formatTime(milliseconds) {
  if (milliseconds <= 0) {
    return "Expired";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function Timer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState(() => (expiresAt || 0) - Date.now());

  useEffect(() => {
    const updateTime = () => {
      setTimeLeft((expiresAt || 0) - Date.now());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  if (!expiresAt) {
    return <span>Expired</span>;
  }

  return <span>{formatTime(timeLeft)}</span>;
}

export default Timer;
