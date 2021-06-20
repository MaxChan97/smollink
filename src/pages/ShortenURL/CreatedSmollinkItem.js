import React from 'react';
// imports for charkra ui
import { useClipboard, Button } from '@chakra-ui/react';

export default function CreatedSmollinkItem({ originalURL, smollink }) {
  const { hasCopied, onCopy } = useClipboard(smollink);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h4>Original URL:</h4>
      <h5>{originalURL}</h5>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h4>smollink:</h4>
        <Button onClick={onCopy} ml={2} size='xs'>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <h5>{smollink}</h5>
      <hr />
    </div>
  );
}
