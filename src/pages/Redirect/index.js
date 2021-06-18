import React, { useEffect } from 'react';
// imports for routing
import { useParams } from 'react-router';
// imports for firebase
import { db } from '../../firebase';

export default function Redirect() {
  const { alias } = useParams();

  useEffect(() => {
    (async () => {
      const firebaseDoc = await db.collection('smollinks').doc(alias).get();
      if (firebaseDoc.exists) {
        window.location.href = firebaseDoc.data().originalURL;
      } else {
        console.log('this alias does not exist');
      }
    })();
  }, [alias]);

  return '';
}
