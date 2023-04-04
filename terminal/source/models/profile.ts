class Profile {
  private _username = "";
  private _passcode = "";
  private _cookie = "";

  constructor() {}

  public seeSession() {
    return !!this._cookie;
  }

  public get username() {
    return this._username;
  }

  public get passcode() {
    return this._passcode;
  }

  public get cookie() {
    return this._cookie;
  }

  public set username(username: string) {
    this._username = username;
  }

  public set passcode(passcode: string) {
    this._passcode = passcode;
  }

  public set cookie(cookie: string) {
    this._cookie = cookie;
  }
}

export default Profile;
