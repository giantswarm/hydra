import React, { useState, useEffect } from 'react';
import Auth from './auth/auth';

const testURL = 'https://g8s.ghost.westeurope.azure.gigantic.io';

const getDexURLFromMapiURL = (mapiEndpoint: string) => {
  return mapiEndpoint.replace('://g8s.', '://dex.g8s.');
};

const createNewAuth = async (mapiEndpoint: string) => {
  const dexURL = getDexURLFromMapiURL(mapiEndpoint);
  const auth = new Auth(dexURL);
  await auth.signIn();
};

function AuthComponent() {
  const [mapiURL, setMapiURL] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewAuth(testURL);
  };

  useEffect(() => {
    const dexURL = getDexURLFromMapiURL(testURL);
    const user = new Auth(dexURL);
    user.signinRedirectCallback();
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          Please configure at least one Giant Swarm Management API endpoint to
          work with. (Enter the dex URL for now)
        </p>
        <label htmlFor="management-api-url" />
        <input onChange={(e) => setMapiURL(e.target.value)} value={mapiURL} />
        <button type="submit">OK</button>
      </form>
    </>
  );
}

export default AuthComponent;
