import { createIdentityConfig } from './authConfig';
import { Log, UserManager, WebStorageStateStore } from 'oidc-client';

export default class Auth {
  protected user: UserManager;

  constructor(dexURL: string) {
    const identityConfig = createIdentityConfig(dexURL);
    const userStore = new WebStorageStateStore({
      store: localStorage,
    });

    this.user = new UserManager({
      ...identityConfig,
      userStore,
    });

    Log.logger = console;
    Log.level = Log.DEBUG;
  }

  public async signinRedirectCallback() {
    try {
      const user = await this.user.signinRedirectCallback();
      window.location.href = 'http://localhost:7000';
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  public async signIn() {
    await this.user.signinRedirect();
  }

  public async getUser() {
    return await this.user.getUser();
  }
}
