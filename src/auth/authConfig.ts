export const CLIENT_ID = 'fFlz7lckhWA0kIaW3fLIl8chFSs2wvW6'; // just copying this from happa

const localHost = 'http://localhost:7000';

export const createIdentityConfig = (dexURL: string) => {
  return {
    redirectMethod: 'replace',
    authority: dexURL,
    client_id: CLIENT_ID,
    redirect_uri: localHost,
    automaticSilentRenew: true,
    loadUserInfo: false,
    includeIDTokenInSilentRenew: true,
    response_type: 'code',
    response_mode: 'query',
    prompt: 'none',
    scope:
      'openid offline_access profile email groups',
    metadata: {
      issuer: dexURL,
      jwks_uri: dexURL + '/keys', // also getting all of this from happa
      authorization_endpoint: dexURL + '/auth?connector_id=giantswarm',
      token_endpoint: dexURL + '/token',
      userinfo_endpoint: dexURL + '/userinfo',

      idTokenSigningAlgValuesSupported: ['RS256'],
      tokenEndpointAuthMethodsSupported: ['client_secret_basic'],
      scopesSupported: [
        'openid',
        'email',
        'groups',
        'profile',
        'offline_access',
      ],
      responseTypesSupported: ['code', 'id_token', 'token'],
      subjectTypesSupported: ['public'],
      claimsSupported: [
        'aud',
        'email',
        'email_verified',
        'exp',
        'iat',
        'iss',
        'locale',
        'name',
        'sub',
      ],
    },
  };
};
