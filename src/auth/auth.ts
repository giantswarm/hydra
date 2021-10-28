import { createIdentityConfig } from './authConfig';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';

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
  }

  public signIn() {
    return this.user.signinRedirect({});
  }

  public handleSignIn(suceessCallback: (user: User) => void) {
    this.user.signinRedirectCallback('http://localhost:7000').then((user) => suceessCallback(user)).catch((err) => console.error(err))
  }

  public async getUser() {
    return await this.user.getUser();
  }
}