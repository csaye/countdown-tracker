import './App.css';

import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { backgroundUrls } from '../../util/backgroundUrls.js';
import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import SignIn from '../SignIn/SignIn.js';

let lastBackgroundIndex = -1;

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App() {
  useAuthState(firebase.auth());

  // returns a random background url
  function getBackgroundUrl() {
    let randomIndex = Math.floor(Math.random() * backgroundUrls.length);
    // ensure random index not last
    while (randomIndex == lastBackgroundIndex) {
      randomIndex = Math.floor(Math.random() * backgroundUrls.length);
    }
    // set last index and return background at index
    lastBackgroundIndex = randomIndex;
    return backgroundUrls[randomIndex];
  }

  const [backgroundUrl, setBackgroundUrl] = useState(getBackgroundUrl());

  return (
    <div className="App">
      {<img className="background-img" src={backgroundUrl} />}
      <Header />
      { firebase.auth().currentUser ? <Body /> : <SignIn /> }
      <button
      className="change-background"
      onClick={() => setBackgroundUrl(getBackgroundUrl())}
      >
        <p>↺</p>
      </button>
    </div>
  );
}

export default App;
