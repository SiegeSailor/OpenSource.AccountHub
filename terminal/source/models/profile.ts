class Profile {
  private _username = "";
  private _cookie = "";

  constructor() {}

  public reset() {
    this._username = "";
    this._cookie = "";
  }

  public seeSession() {
    return !!this._cookie;
  }

  public get username() {
    return this._username;
  }

  public get cookie() {
    return this._cookie;
  }

  public set username(username: string) {
    this._username = username;
  }

  public set cookie(cookie: string) {
    this._cookie = cookie;
  }
}

export default Profile;
