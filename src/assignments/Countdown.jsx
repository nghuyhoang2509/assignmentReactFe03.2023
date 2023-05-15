import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [activeTimeline, setActiveTimeline] = useState(false);
  const [timeline, setTimeline] = useState({
    min: 0,
    secs: 0,
  });
  let countTimeout;

  useEffect(() => {
    if (activeTimeline) {
      if (timeline.secs == 0 && timeline.min == 0) {
        setActiveTimeline(false);
        setTimeline({ min: 0, secs: 0 });
      } else {
        countTimeout = setTimeout(() => {
          if (timeline.secs == 0) {
            timeline.min--;
            timeline.secs = 59;
          } else {
            timeline.secs--;
          }
          setTimeline({ ...timeline });
        }, 1000);
      }
    }
    return () => {
      clearTimeout(countTimeout);
    };
  }, [timeline]);

  const startOnClick = () => {
    setActiveTimeline(true);
    setTimeline({ ...timeline });
  };
  const resetOnClick = () => {
    clearTimeout(countTimeout);
    setActiveTimeline(false);
    setTimeline({ min: 0, secs: 0 });
  };
  return (
    <div className="task">
      <h1>1.Countdown</h1>
      <div className="time-line">
        <input
          type="number"
          value={timeline.min}
          onChange={(e) => setTimeline({ ...timeline, min: e.target.value })}
        />
        <h5>mins</h5>
        <input
          type="number"
          value={timeline.secs}
          onChange={(e) => setTimeline({ ...timeline, secs: e.target.value })}
        />
        <h5>secs</h5>
      </div>
      <div className="control">
        <input type="button" onClick={startOnClick} value={"start"} />
        <input type="button" onClick={resetOnClick} value={"reset"} />
      </div>
    </div>
  );
}
