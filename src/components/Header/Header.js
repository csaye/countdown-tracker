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
        <button onClick={signOut}>Sign Out</button>
      }
    </div>
  )
}

export default Header;
