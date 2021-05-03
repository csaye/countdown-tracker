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

  const [editing, setEditing] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  const [timeLeft, setTimeLeft] = useState(endDate - new Date());
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function deleteCountdown() {
    await firebase.firestore().collection('countdowns').doc(id).delete();
  }

  useEffect(() => {
    // update time left every tenth of a second
    setTimeLeft(endDate - new Date());
    const interval = setInterval(() => {
      setTimeLeft(endDate - new Date());
    }, 100);
    return () => clearInterval(interval);
  }, [endDateTime]);

  function formatDate(d) {
    let year = d.getFullYear().toString();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  function formatTime(d) {
    let hour = d.getHours().toString();
    let minute = d.getMinutes().toString();

    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;

    return [hour, minute].join(':');
  }

  function startEditing() {
    // reset form parameters
    setNewTitle(title);
    setNewEndDate(formatDate(endDate));
    setNewEndTime(formatTime(endDate));
    setEditing(true);
  }

  async function updateCountdown(e) {
    e.preventDefault();
    setEditing(false);
    const newEndDateTime = new Date(newEndDate + ' ' + newEndTime);
    const uid = firebase.auth().currentUser.uid;
    await firebase.firestore().collection(uid).doc(id).update({
      title: newTitle,
      endDateTime: newEndDateTime
    });
  }

  return (
    <div className="Countdown card">
      {
        editing ?
        <>
          <button className="x-button" onClick={() => setEditing(false)}>✖</button>
          <p className="center-form-title">Editing Countdown</p>
          <form onSubmit={updateCountdown} className="center-form">
            <input
            className="title-input"
            type="text"
            value={newTitle}
            placeholder="Title"
            onChange={e => setNewTitle(e.target.value)}
            required
            />
            <input
            type="date"
            value={newEndDate}
            onChange={e => setNewEndDate(e.target.value)}
            required
            />
            <input
            type="time"
            value={newEndTime}
            onChange={e => setNewEndTime(e.target.value)}
            required
            />
            <button type="submit">Update</button>
          </form>
        </> :
        <>
          <h1>{title}</h1>
          <p className="end-date">{endDate.toDateString() + ', ' + endDate.toLocaleTimeString()}</p>
          {
            timeLeft > 0 ?
            <p className="time-left">
              <span className="time-num">{Math.floor(timeLeft / DAY_MS)}</span>d
              <span className="time-num">{Math.floor((timeLeft % DAY_MS) / HOUR_MS)}</span>h
              <span className="time-num">{Math.floor(((timeLeft % DAY_MS) % HOUR_MS) / MIN_MS)}</span>m
              <span className="time-num">{Math.floor((((timeLeft % DAY_MS) % HOUR_MS) % MIN_MS) / SEC_MS)}</span>s
            </p> :
            <p className="time-left countdown-complete">Countdown complete</p>
          }
          { !confirmDelete && <button className="edit-button" onClick={startEditing}>Edit</button> }
        </>
      }
      {
        !editing &&
        <>
          {
            confirmDelete ?
            <div className="confirm-delete">
              Delete countdown?
              <button onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button onClick={deleteCountdown}>Delete</button>
            </div> :
            <button onClick={() => setConfirmDelete(true)}>Delete</button>
          }
        </>
      }
    </div>
  );
}

export default Countdown;
