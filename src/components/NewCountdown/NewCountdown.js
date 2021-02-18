import './NewCountdown.css';

import React, { useState } from 'react';

import firebase from 'firebase/app';

function NewCountdown() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  async function addCountdown(e) {
    e.preventDefault();
    // close
    setOpen(false);
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
    <div className="NewCountdown card">
      {
        open ?
        <div>
          <button className="x-button" onClick={() => setOpen(false)}>✖</button>
          <p>New Countdown</p>
          <form onSubmit={addCountdown}>
            <input
            className="title-input"
            type="text"
            value={title}
            placeholder="Title"
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
        </div> :
        <div className="center-container">
          <button className="plus-button" onClick={() => setOpen(true)}>+</button>
        </div>
      }
    </div>
  )
}

export default NewCountdown;
