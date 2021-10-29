import React from 'react';
import { Link } from "react-router-dom";

import { Paragraph } from 'grommet';

function Home() {
  return (
    <Paragraph>Go to <Link to="/auth/">/auth/</Link> to add an endpoint URL.</Paragraph>
  );
}

export default Home;
