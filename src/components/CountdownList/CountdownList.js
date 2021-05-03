import './CountdownList.css';

import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Countdown from '../Countdown/Countdown.js';
import NewCountdown from '../NewCountdown/NewCountdown.js';

function CountdownList() {
  const uid = firebase.auth().currentUser.uid;
  const countdownsRef = firebase.firestore().collection(uid);
  const countdownsQuery = countdownsRef.orderBy('endDateTime');
  const [countdowns] = useCollectionData(countdownsQuery, {idField: 'id'});

  // if no countdowns yet, return loading
  if (!countdowns) {
    return (
      <div className="CountdownList">
        <p className="retrieving-countdowns">Retrieving countdowns...</p>
      </div>
    );
  }

  return (
    <div className="CountdownList">
      {
        countdowns.map(c => <Countdown key={c.id} data={c} />)
      }
      <NewCountdown />
    </div>
  );
}

export default CountdownList;
