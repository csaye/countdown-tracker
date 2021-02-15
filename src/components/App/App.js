import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Header from '../Header/Header.js';
import Body from '../Body/Body.js';
import SignIn from '../SignIn/SignIn.js';

// initialize firebase
firebase.initializeApp(firebaseConfig);

function App() {
  useAuthState(firebase.auth());

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <section>
        { firebase.auth().currentUser ? <Body /> : <SignIn /> }
      </section>
    </div>
  );
}

export default App;
