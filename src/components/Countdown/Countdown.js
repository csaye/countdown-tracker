import './Countdown.css';

import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';

const SEC_MS = 1000;
const MIN_MS = SEC_MS * 60;
const HOUR_MS = MIN_MS * 60;
const DAY_MS = HOUR_MS * 24;

function Countdown(props) {
  // get title and end time from data
  const { title, id, endDateTime } = props.data;
  const endDate = endDateTime.toDate();

  const [timeLeft, setTimeLeft] = useState(endDate - new Date());

  async function deleteCountdown() {
    await firebase.firestore().collection('countdowns').doc(id).delete();
  }

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
      <p>{endDate.toDateString() + ', ' + endDate.toLocaleTimeString()}</p>
      <p>
        <span className="time-num">{Math.floor(timeLeft / DAY_MS)}</span>d
        <span className="time-num">{Math.floor((timeLeft % DAY_MS) / HOUR_MS)}</span>h
        <span className="time-num">{Math.floor(((timeLeft % DAY_MS) % HOUR_MS) / MIN_MS)}</span>m
        <span className="time-num">{Math.floor((((timeLeft % DAY_MS) % HOUR_MS) % MIN_MS) / SEC_MS)}</span>s
      </p>
      <button onClick={deleteCountdown}>Delete</button>
    </div>
  );
}

export default Countdown;
