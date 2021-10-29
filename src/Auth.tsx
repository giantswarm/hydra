import React, { useState } from 'react';
import Auth from './auth/auth';
import { User } from 'oidc-client';

import { Box, Button, Form, TextInput } from 'grommet';

const dexURL = 'https://dex.g8s.ghost.westeurope.azure.gigantic.io';

const successCallback = (user: User) => {
  console.log('HELLO', user)

  // Avoid further auth redirects
  window.location.href = window.location.protocol + "//" + window.location.host + "/";
};

const handleAuthFlow = () => {
  const auth = new Auth(dexURL);
  auth?.signIn();
  auth.handleSignIn(successCallback);
}

let queryParams = new URLSearchParams(window.location.search);
if (queryParams.get('code')) {
  handleAuthFlow();
}

function AuthComponent() {
  const [mapiURL, setMapiURL] = useState(dexURL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthFlow();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <p>
          Please configure at least one Giant Swarm Management API endpoint to
          work with. (Enter the dex URL for now)
        </p>
        <Box direction="row" gap="small">
          <TextInput
            placeholder="Enter Management API URL"
            value={mapiURL}
            onChange={event => setMapiURL(event.target.value)}
            />
          <Button type="submit" primary label="Add" />
        </Box>
      </Form>
    </>
  );
}

export default AuthComponent;
