import React, { useState } from 'react';

import firebase from 'firebase/app';

function MakeCountdown() {
  const [title, setTitle] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endDate, setEndDate] = useState('');

  async function addCountdown(e) {
    e.preventDefault();
    const endDateTime = new Date(endDate + ' ' + endTime);
    const uid = firebase.auth().currentUser.uid;
    const countdownsRef = firebase.firestore().collection('countdowns');
    await countdownsRef.add({
      endDateTime,
      title,
      uid
    });
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
