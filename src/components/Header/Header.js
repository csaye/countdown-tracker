import './Header.css';

import firebase from 'firebase/app';

function Header() {
  // signs out current user
  function signOut() {
    firebase.auth().signOut();
  }

  return (
    <div className="Header">
      <h1>Countdown Tracker</h1>
      {
        firebase.auth().currentUser &&
        <div className="authed-items">
          <p className="signed-in-as">Signed in as {firebase.auth().currentUser.displayName}</p>
          <img src={firebase.auth().currentUser.photoURL} />
          <button onClick={signOut}>Sign Out</button>
        </div>
      }
    </div>
  )
}

export default Header;
