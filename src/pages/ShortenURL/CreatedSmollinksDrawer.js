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
// import created smollink item component
import CreatedSmollinkItem from './CreatedSmollinkItem';

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
      .orderBy('createdAt')
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
    if (createdSmollinks.length === 0) {
      return <h1 style={{ textAlign: 'center' }}>No smollinks!</h1>;
    } else {
      return createdSmollinks.map((createdSmollink, idx) => {
        const smollink = window.location.href + createdSmollink.smollinkAlias;
        return (
          <CreatedSmollinkItem
            key={idx}
            originalURL={createdSmollink.originalURL}
            smollink={smollink}
          />
        );
      });
    }
  }

  return (
    <div>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>My smollinks</DrawerHeader>
          {isLoading ? (
            <DrawerBody>
              <Spinner />
            </DrawerBody>
          ) : (
            <DrawerBody style={{ paddingTop: '0' }}>
              {displayCreatedSmollinkItems()}
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
