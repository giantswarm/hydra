import React, { useState } from 'react';
import Auth from './auth/auth';
import { User } from 'oidc-client';
import EndpointManager from './auth/endpointManager';

import { Box, Button, Form, TextInput } from 'grommet';

const defaultDexURL = 'https://dex.g8s.ghost.westeurope.azure.gigantic.io';

const successCallback = (user: User) => {
  console.log('HELLO', user)

  // Avoid further auth redirects
  window.location.href = window.location.protocol + "//" + window.location.host + "/";
};

const handleAuthFlow = (dexUrl: string) => {
  const auth = new Auth(dexUrl);
  auth?.signIn();
  auth.handleSignIn(successCallback);
}

let queryParams = new URLSearchParams(window.location.search);
if (queryParams.get('code')) {
  // Get our dex URL from storage
  const state = queryParams.get('state');
  const storageKey = `oidc.${state}`;
  const jsonString = localStorage.getItem(storageKey);
  if (jsonString) {
    const data = JSON.parse(jsonString);
    const dexURL = data['authority'];
    handleAuthFlow(dexURL);
  } else {
    console.error(`Could not decode a JSON string from localStorage key ${storageKey}`);
  }
}

type AuthProps = {
  endpointManager: EndpointManager;
}

function AuthComponent({ endpointManager }: AuthProps) {
  const [dexURL, setDexURL] = useState(defaultDexURL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    endpointManager.addByIssuerURL(dexURL);
    handleAuthFlow(dexURL);
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
            value={dexURL}
            onChange={event => setDexURL(event.target.value)}
            />
          <Button type="submit" primary label="Add" />
        </Box>
      </Form>
    </>
  );
}

export default AuthComponent;
