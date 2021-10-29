import { createIdentityConfig } from './authConfig';
import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';

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

  public handleSignIn(successCallback: (user: User) => void) {
    console.debug('auth.handleSignIn called');
    this.user.signinRedirectCallback(window.location.href).then(function(user) {
      console.log('signin success callback done. user:', user);
      successCallback(user);
    }).catch(function(err) {
      console.log('Error in signin callback')
      console.error(err);
    });
  }

  public async signIn() {
    await this.user.signinRedirect();
  }

  public async getUser() {
    return await this.user.getUser();
  }
}
