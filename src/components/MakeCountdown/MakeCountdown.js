import React, { useState } from 'react';

import firebase from 'firebase/app';

function MakeCountdown() {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  async function addCountdown(e) {
    e.preventDefault();
    const endDateTime = new Date(endDate + ' ' + endTime);
    const uid = firebase.auth().currentUser.uid;
    const countdownsRef = firebase.firestore().collection('countdowns');
    // add countdown
    await countdownsRef.add({
      endDateTime,
      title,
      uid
    });
    // reset inputs
    setTitle('');
    setEndDate('');
    setEndTime('');
  }

  return (
    <div className="MakeCountdown">
      <p>Make Countdown</p>
      <form onSubmit={addCountdown}>
        <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        />
        <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        required
        />
        <input
        type="time"
        step="1"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default MakeCountdown;
