type Endpoint = {
  // Base domain is also the unique identifier of the endpoint
  // here in this manager.
  baseDomain: string;

  // A short name identifying the installation/endpoint
  codeName: string;

  // The provider name for the installation (aws, azure, ...)
  provider: string

  // Identity provider URL (usually dex)
  issuerURL: string;

  // Management API endpoint URL
  endpointURL: string;

  // Athena URL
  athenaURL: string
  
  // Kexy to access the oidc.user entry for this endpoint
  // in localStorage
  oidcUserKey: string
}

interface EndpointMap {
  [baseDomain: string]: Endpoint
}

export default class EndpointManager {
  endpoints: EndpointMap = {};
  oidcClientID: string;
  storageKey: string = 'endpoints';

  constructor(oidcClientID: string) {
    this.oidcClientID = oidcClientID;

    // initialize endpoints from localStorage
    const storage = localStorage.getItem(this.storageKey);
    if (storage) {
      this.endpoints = JSON.parse(storage);
    }
  }

  /**
    * @returns Array of all configured endpoints
    */
  getEndpoints(): EndpointMap {
    return this.endpoints;
  }

  getNumEndpoints(): number {
    return Object.keys(this.endpoints).length;
  }

  /**
    * Adds an endpoint by only passing a Dex URL. The rest will be
    * fetched from localStorage or from the internet.
    *
    * Warning: existing entries with the same base domain will
    * get replaced.
    *
    * @param issuerURL Dex URL without trailing slash
    */
  addByIssuerURL(issuerURL: string) {
    const key = `oidc.user:${issuerURL}:${this.oidcClientID}`;
    const userItem = localStorage.getItem(key);

    if (userItem) {
      let ep = {} as Endpoint;
      ep.issuerURL = issuerURL;
      ep.oidcUserKey = key
      ep.baseDomain = issuerURL.replace('https://dex.', '');
      ep.endpointURL = `https://happaapi.${ep.baseDomain}`;
      ep.athenaURL = `https://athena.${ep.baseDomain}/graphql`;

      // TODO: fetch codename and provider from athena

      this.endpoints[ep.baseDomain] = ep;
      this.persist();
    } else {
        console.error(`Could not read item ${key} from localStorage`);
    }
  }

  /**
    * Writes endpoints to localStorage
    */
  persist() {
    const jsonString = JSON.stringify(this.endpoints);
    localStorage.setItem(this.storageKey, jsonString);
  }

  /**
   * @param baseDomain Base domain
   * @returns ID Token for the base domain, if set, as a string
   */
  getIDToken(baseDomain: string): string | null {
    const key = `oidc.user:https://dex.${baseDomain}:${this.oidcClientID}`;
    
    const userItem = localStorage.getItem(key);
    if (userItem) {
      const data = JSON.parse(userItem);
      return data['id_token'];
    }

    return null;
  }
}
