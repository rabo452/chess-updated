import { AxiosError } from "axios";
import { AxiosClient } from "shared/api";
import { Tokens } from "./types";
import { TokenStorage } from "../models/TokenStorage";

AxiosClient.interceptors.request.use((config) => {
    try {
        config.headers['Authorization'] = `Bearer ${TokenStorage.accessToken}`;
    }catch(e) {}
    
    return config;
})

AxiosClient.interceptors.response.use((res) => res, async (error: AxiosError) => {
    const config = error.config;
    if (error.response?.status == 401 && config && !(config as any).isRetry) {
        try {
            var refresh_token = TokenStorage.refreshToken;
            (config as any).isRetry = true;
            var access = await AuthApi.refreshAcessToken(refresh_token);
            TokenStorage.accessToken = access;

            AxiosClient.request(config);

        }catch(e) {
            return error;
        }
    }

    return error;
});

export class AuthApi {
    static isAuthorizated(): boolean {
        try {
            AuthApi.refreshAcessToken(TokenStorage.refreshToken);
            return true;
        }catch(e) {
            return false;
        }
    }

    static logout() {
        TokenStorage.deleteTokens();
    }

    static async login(username: string, password: string): Promise<Tokens> {
        var response = await AxiosClient.post('/api/login', {
            username,
            password
        });

        var tokens: Tokens = response.data;
        return tokens;
    }

    static async createUser(username: string, password: string): Promise<Tokens> {
        var response = await AxiosClient.post('/api/user-create', {
            username,
            password
        });

        var tokens: Tokens = response.data;
        return tokens;
    }

    static async refreshAcessToken(refresh_token: string): Promise<string> {
        var response = await AxiosClient.post("/api/token/refresh", {
            "refresh": refresh_token
        });

        var access_token: string = response.data['access'];
        return access_token;
    }
}

export {AxiosClient}