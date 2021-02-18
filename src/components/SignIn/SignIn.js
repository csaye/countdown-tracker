import './SignIn.css';

import firebase from 'firebase/app';

function SignIn() {
  // opens google sign in popup
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className="SignIn">
      <u>Countdown Tracker</u>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default SignIn;
