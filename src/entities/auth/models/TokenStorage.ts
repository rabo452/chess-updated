export class TokenStorage {
    static get accessToken(): string {
        var token = localStorage.getItem("access");
        if (!token) {
            throw new Error("access token is not found in local storage");
        }

        return token as string;
    }

    static get refreshToken(): string {
        var token = localStorage.getItem("refresh");
        if (!token) {
            throw new Error("refresh token is not found in local storage");
        }

        return token as string;
    }

    static set refreshToken(refresh: string) {
        localStorage.setItem("refresh", refresh);
    }

    static set accessToken(access: string) {
        localStorage.setItem("access", access);
    }

    static deleteTokens() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    }
}