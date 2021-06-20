import React, { useState, useEffect } from 'react';
// imports for charkra ui components
import {
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
// imports for local assets
import TypingIcon from '../../assets/icons/TypingIcon.svg';
import CustomizeIcon from '../../assets/icons/CustomizeIcon.svg';
// imports for validating URL
import validator from 'validator';
// imports for alert messages
import { toast } from 'react-toastify';
// imports for generating random string
import cryptoRandomString from 'crypto-random-string';
// imports for firebase
import { db } from '../../firebase';
import firebase from 'firebase/app';
// imports for redux
import { useSelector, useDispatch } from 'react-redux';
import { addNewUser } from '../../redux/actions';
// imports for drawer displaying created smollinks
import CreatedSmollinkDrawer from './CreatedSmollinksDrawer';

export function processURL(inputURL) {
  let processedURL;
  if (inputURL.slice(0, 12) === 'https://www.') {
    // this format 'https://www.google.com'
    // no need do anything
    processedURL = inputURL;
  } else if (inputURL.slice(0, 8) === 'https://') {
    // this format 'https://google.com'
    const rawURL = inputURL.slice(8);
    processedURL = 'https://www.' + rawURL;
  } else if (inputURL.slice(0, 4) === 'www.') {
    // this format 'www.google.com'
    const rawURL = inputURL.slice(4);
    processedURL = 'https://www.' + rawURL;
  } else {
    // this format 'google.com'
    processedURL = 'https://www.' + inputURL;
  }
  return processedURL;
}

export default function ShortenURL() {
  const dispatch = useDispatch();
  let smollinkCurrentUser = useSelector((state) => state.smollinkCurrentUser);

  const [inputURL, setInputURL] = useState('');
  const [customSmollinkAlias, setCustomSmollinkAlias] = useState('');
  const [isCreatingSmollink, setIsCreatingSmollink] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(smollinkCurrentUser);
    if (!smollinkCurrentUser) {
      console.log('new user created');
      const newUserId = cryptoRandomString({ length: 20, type: 'url-safe' });
      db.collection('users').doc(newUserId).set({});
      dispatch(addNewUser(newUserId));
      smollinkCurrentUser = newUserId;
    }
    console.log(smollinkCurrentUser);
  }, [smollinkCurrentUser]);

  async function isCustomSmollinkAliasTaken() {
    const firebaseDoc = await db
      .collection('smollinks')
      .doc(customSmollinkAlias)
      .get();
    return firebaseDoc.exists;
  }

  function isCustomSmollinkAliasValid() {
    // always returns false
    return validator.isURL('https://www.google.com/' + customSmollinkAlias);
  }

  async function onCreateSmollink() {
    // check the format of the originalURL input i.e. is it 'https://www.google.com' or 'https://google.com' or 'www.google.com' or 'google.com' and process accordingly
    setIsCreatingSmollink(true);
    let processedURL = processURL(inputURL);
    // check if URL to be shortened is legit
    const isURLValid = validator.isURL(processedURL);
    if (isURLValid) {
      // check if users custom smollink alias is usable
      if (customSmollinkAlias !== '' && (await isCustomSmollinkAliasTaken())) {
        toast.error('Custom link inputted is already taken!');
      } else if (customSmollinkAlias !== '' && !isCustomSmollinkAliasValid()) {
        toast.error('Custom link inputted is not a valid URL!');
      } else {
        let smollinkAlias;
        if (customSmollinkAlias !== '') {
          // use custom smollink alias
          smollinkAlias = customSmollinkAlias;
        } else {
          // generate random string as smollink alias
          smollinkAlias = cryptoRandomString({ length: 10, type: 'url-safe' });
        }
        // persist and send success msg
        const timestamp = firebase.firestore.FieldValue.serverTimestamp;
        db.collection('smollinks')
          .doc(smollinkAlias)
          .set({
            originalURL: processedURL,
            creator: smollinkCurrentUser,
            createdAt: timestamp(),
          })
          .then(() => {
            db.collection('users')
              .doc(smollinkCurrentUser)
              .collection('createdSmollinks')
              .doc(smollinkAlias)
              .set({
                originalURL: processedURL,
                createdAt: timestamp(),
              })
              .then(() => {
                toast.success('smollink successfully created!');
                setInputURL('');
                setCustomSmollinkAlias('');
                onOpen();
              })
              .catch((error) => {
                toast.error('Something went wrong please try again');
                console.error('Error writing document: ', error);
              });
          })
          .catch((error) => {
            toast.error('Something went wrong please try again');
            console.error('Error writing document: ', error);
          });
      }
    } else {
      toast.error('The inputted URL is invalid!');
    }
    setIsCreatingSmollink(false);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '60%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text color='gray.500' fontSize='4xl'>
            Welcome to smollink!
          </Text>
          <Button
            colorScheme='teal'
            variant='outline'
            style={{ marginTop: '8px' }}
            onClick={onOpen}
          >
            My smollinks
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            textAlign: 'start',
            alignItems: 'center',
            paddingTop: '18px',
            paddingBottom: '10px',
          }}
        >
          <img
            src={TypingIcon}
            alt=''
            style={{ height: '38px', marginRight: '8px' }}
          />
          <Text color='black.500' fontSize='lg'>
            Enter a long URL to make a smollink
          </Text>
        </div>
        <InputGroup>
          <InputLeftAddon children='https://www.' />
          <Input
            value={inputURL}
            onChange={(e) => {
              setInputURL(e.target.value);
            }}
            placeholder='Enter url here'
          />
        </InputGroup>
        <div
          style={{
            display: 'flex',
            width: '100%',
            textAlign: 'start',
            alignItems: 'center',
            paddingTop: '18px',
            paddingBottom: '10px',
          }}
        >
          <img
            src={CustomizeIcon}
            alt=''
            style={{ height: '38px', marginRight: '8px' }}
          />
          <Text color='black.500' fontSize='lg'>
            Customise your link
          </Text>
        </div>
        <InputGroup>
          <InputLeftAddon children={window.location.href} />
          <Input
            value={customSmollinkAlias}
            onChange={(e) => {
              setCustomSmollinkAlias(e.target.value);
            }}
            width='50%'
            placeholder='Leave this empty if you do not mind a random link'
          />
        </InputGroup>
        <div style={{ paddingTop: '30px' }}>
          <Button
            isLoading={isCreatingSmollink}
            loadingText='Creating'
            colorScheme='teal'
            variant='solid'
            onClick={onCreateSmollink}
          >
            Create smollink!
          </Button>
        </div>
      </div>
      <CreatedSmollinkDrawer
        isOpen={isOpen}
        onClose={onClose}
        smollinkCurrentUser={smollinkCurrentUser}
      />
    </div>
  );
}
