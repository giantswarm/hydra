import { CLIENT_ID } from '../auth/authConfig';

export async function getClusters(authority: string) {
  const idToken = getIDTokenForAuthority(authority);
  console.log(idToken);
  return await fetch(
    'https://happaapi.g8s.ghost.westeurope.azure.gigantic.io/apis/security.giantswarm.io/v1alpha1/organizations?limit=500',
    {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
    }
  );
}

export function getIDTokenForAuthority(authority: string) {
  const data = localStorage.getItem(`oidc.user:${authority}:${CLIENT_ID}`);
  if (data) {
    return JSON.parse(data).id_token;
  }
}
