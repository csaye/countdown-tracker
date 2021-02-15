import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Countdown from '../Countdown/Countdown.js';

function CountdownList() {
  const countdownsRef = firebase.firestore().collection('countdowns');
  const countdownsQuery = countdownsRef
  .where('uid', '==', firebase.auth().currentUser.uid)
  .orderBy('endTime');
  const [countdowns] = useCollectionData(countdownsQuery, {idField: 'id'});

  // if no countdowns yet, return loading
  if (!countdowns) {
    return (
      <div className="CountdownList">
        <p>Retrieving countdowns...</p>
      </div>
    );
  }

  return (
    <div className="CountdownList">
      {
        countdowns.length > 0 ?
        countdowns.map(c => <Countdown key={c.id} data={c} />) :
        <p>No countdowns yet</p>
      }
    </div>
  );
}

export default CountdownList;
