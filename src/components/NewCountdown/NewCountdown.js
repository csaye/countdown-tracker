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
    const countdownsRef = firebase.firestore().collection(uid);
    // add countdown
    await countdownsRef.add({
      endDateTime,
      title
    });
    // reset inputs
    setTitle('');
    setEndDate('');
    setEndTime('');
  }

  // closes new countdown dialogue
  function close() {
    setOpen(false);
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
          <button className="x-button" onClick={close}>✖</button>
          <p className="center-form-title">New Countdown</p>
          <form onSubmit={addCountdown} className="center-form">
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
