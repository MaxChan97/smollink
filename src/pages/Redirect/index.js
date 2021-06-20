import React, { useEffect } from 'react';
// imports for routing
import { useParams, useHistory } from 'react-router-dom';
// imports for firebase
import { db } from '../../firebase';

export default function Redirect() {
  const { alias } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const firebaseDoc = await db.collection('smollinks').doc(alias).get();
      if (firebaseDoc.exists) {
        window.location.href = firebaseDoc.data().originalURL;
      } else {
        // send to not found page
        history.push('/NotFound/NotFound');
      }
    })();
  }, [alias]);

  return '';
}
