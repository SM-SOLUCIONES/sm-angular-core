export class AccessToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: Date;
  refreshTokenExpiration: Date;

  constructor(json: any) {
    this.accessToken = json.accessToken;
    this.refreshToken = json.refreshToken;
    this.accessTokenExpiration = new Date(json.accessTokenExpiration);
    this.refreshTokenExpiration = new Date(json.refreshTokenExpiration);
  }
}
