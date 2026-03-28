import { useEffect, useState } from "react";
import { formatTimeRemaining } from "../utils/formatTime";

function Timer({ expiresAt }) {
  const [timeLeftMs, setTimeLeftMs] = useState(
    () => (expiresAt ?? 0) - Date.now()
  );

  useEffect(() => {
    const tick = () => {
      setTimeLeftMs((expiresAt ?? 0) - Date.now());
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  if (!expiresAt) {
    return <span className="text-earth-500">—</span>;
  }

  return <span>{formatTimeRemaining(timeLeftMs)}</span>;
}

export default Timer;
