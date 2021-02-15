import React, { useEffect, useState } from 'react';

function Countdown(props) {
  // get title and end time from data
  const { title, endDateTime } = props.data;
  const endDate = endDateTime.toDate();

  const [timeLeft, setTimeLeft] = useState(endDate - new Date());

  useEffect(() => {
    // update time left every second
    const interval = setInterval(() => {
      setTimeLeft(endDate - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Countdown">
      <h1>{title}</h1>
      <p>{endDate.toString()}</p>
      <p>{timeLeft / 1000} seconds left</p>
    </div>
  );
}

export default Countdown;
