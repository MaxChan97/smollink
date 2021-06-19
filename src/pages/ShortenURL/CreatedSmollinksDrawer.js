import React, { useState, useEffect } from 'react';
// imports for charkra ui components
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Spinner,
} from '@chakra-ui/react';
// imports for firebase
import { db } from '../../firebase';

export default function CreatedSmollinksDrawer({
  isOpen,
  onClose,
  smollinkCurrentUser,
}) {
  const [createdSmollinks, setCreatedSmollinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      loadCreatedSmollinks();
    }
  }, [isOpen]);

  function loadCreatedSmollinks() {
    setIsLoading(true);
    db.collection('users')
      .doc(smollinkCurrentUser)
      .collection('createdSmollinks')
      .get()
      .then((querySnapshot) => {
        let createdSmollinksTemp = [];
        querySnapshot.forEach((doc) => {
          let smollink = {
            smollinkAlias: doc.id,
            originalURL: doc.data().originalURL,
          };
          createdSmollinksTemp.unshift(smollink);
        });
        setCreatedSmollinks(createdSmollinksTemp);
        console.log(createdSmollinksTemp);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function displayCreatedSmollinkItems() {
    return createdSmollinks.map((createdSmollink, idx) => {
      const smollink = window.location.href + createdSmollink.smollinkAlias;
      return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Original URL:</h4>
          <h5>{createdSmollink.originalURL}</h5>
          <h4>smollink:</h4>
          <h5>{smollink}</h5>
          <hr />
        </div>
      );
    });
  }

  return (
    <div>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Created smollinks</DrawerHeader>
          {isLoading ? (
            <Spinner />
          ) : (
            <DrawerBody>{displayCreatedSmollinkItems()}</DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
