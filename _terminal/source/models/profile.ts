class Profile {
  private _username = "";
  private _session = "";

  constructor() {}

  public reset() {
    this._username = "";
    this._session = "";
  }

  public seeSession() {
    return !!this._session;
  }

  public get username() {
    return this._username;
  }

  public get session() {
    return this._session;
  }

  public set username(username: string) {
    this._username = username;
  }

  public set session(session: string) {
    this._session = session;
  }
}

export default Profile;
