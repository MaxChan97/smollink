import React, { useState } from 'react';
// imports for firebase
//import { db } from '../../firebase';
// imports for generating random string
//import cryptoRandomString from 'crypto-random-string';
// imports for charkra ui components
import { Text, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
// imports for local assets
import TypingIcon from '../../assets/icons/TypingIcon.svg';

export default function ShortenURL() {
  const [originalURL, setOriginalURL] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '60%',
        }}
      >
        <Text color="gray.500" fontSize="4xl">
          Welcome to smollink!
        </Text>
        <div
          style={{
            display: 'flex',
            width: '100%',
            textAlign: 'start',
            alignItems: 'center',
          }}
        >
          <img
            src={TypingIcon}
            alt=""
            style={{ height: '38px', marginRight: '8px' }}
          />
          <Text color="black.500" fontSize="lg">
            Enter a long URL to make a smollink
          </Text>
        </div>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input
            value={originalURL}
            onChange={(e) => {
              setOriginalURL(e.target.value);
            }}
            placeholder="Enter url here"
          />
        </InputGroup>
      </div>
    </div>
  );
}
