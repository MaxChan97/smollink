import React from 'react';
// imports for react router
import { useHistory } from 'react-router-dom';
// imports for charkra ui components
import { Text } from '@chakra-ui/react';

export default function NotFound() {
  const history = useHistory();

  function onClickReturnMainPage() {
    history.push('/');
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
        <Text color='gray.500' fontSize='4xl'>
          The page you're looking for does not exist
        </Text>
        <Text
          as='u'
          color='blue.500'
          fontSize='xl'
          style={{ cursor: 'pointer' }}
          onClick={onClickReturnMainPage}
        >
          please click here to return to main page
        </Text>
      </div>
    </div>
  );
}
