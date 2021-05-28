export class AuthModel {
    accessToken: string;
    refreshToken: string;
    expires: number;

    setAuth(auth: any) {
        this.accessToken = auth.accessToken;
        this.refreshToken = auth.refreshToken;
        this.expires = auth.expires;
    }
}
