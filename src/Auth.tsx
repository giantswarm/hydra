import React, {useState} from 'react';
import Auth from './auth/auth';
import { User } from 'oidc-client';

function AuthComponent() {
  const [mapiURL, setMapiURL] = useState('');

  const successCallback = (user: User) => {console.log('HELLO', user)}

  const handleSubmit = (e: React.FormEvent) => {
    const auth = new Auth(mapiURL);
    e.preventDefault();

    auth?.signIn();
    auth.handleSignIn(successCallback)
  };

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
