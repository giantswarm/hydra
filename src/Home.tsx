import React from 'react';
import { Link } from 'react-router-dom';

import { Paragraph } from 'grommet';
import { getClusters } from './utils/fetch';

function Home() {
  const handleClick = async () => {
    try {
      await getClusters('https://dex.g8s.ghost.westeurope.azure.gigantic.io');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Paragraph>
        Go to <Link to="/auth/">/auth/</Link> to add an endpoint URL.
      </Paragraph>
      <button onClick={handleClick}>post token</button>
    </>
  );
}

export default Home;
