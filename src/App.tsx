import React from 'react';
import './App.css';

import { Grommet, Box, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';

function App() {
  return (
    <Grommet full theme={grommet}>
      {Grid.available ? (
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background="dark-2"
          >
            <img src="https://s.giantswarm.io/brand/1/logo-white.svg" alt="Giant Swarm" id="top-logo"/>
            <Text>Menu placeholder</Text>
          </Box>
          <Box gridArea="main" justify="center" align="center">
            <Text>main</Text>
          </Box>
        </Grid>
      ) : (
        <Text>Your browser does not support grid layout. Please check <a href="https://caniuse.com/css-grid">this page</a> to find out which browser you could use.</Text>
      )}
    </Grommet>
  );
}

export default App;
