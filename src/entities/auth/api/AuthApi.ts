import { AxiosError } from "axios";
import { AxiosClient, baseURL } from "shared/api";
import { Tokens, User } from "./types";
import { TokenStorage } from "../models/TokenStorage";

AxiosClient.interceptors.request.use((config) => {
    try {
        config.headers['Authorization'] = `Bearer ${TokenStorage.accessToken}`;
    }catch(e) {}
    
    return config;
})

AxiosClient.interceptors.response.use((res) => res, async (error: AxiosError) => {
    const config = error.config;
    const refreshEndPoint = `${baseURL}/api/token/refresh`;

    if (error.response?.status == 401 && config && error.request.responseURL != refreshEndPoint) {
        try {
            var refresh_token = TokenStorage.refreshToken;
            (config as any).isRetry = true;
            var access = await AuthApi.refreshAcessToken(refresh_token);
            TokenStorage.accessToken = access;

            return AxiosClient.request(config);
        }catch(e) {
            AuthApi.logout();
        }
    }

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

        var tokens: Tokens = response.data as Tokens;
        return tokens;
    }

    static async createUser(username: string, password: string): Promise<Tokens> {
        var response = await AxiosClient.post('/api/user-create', {
            username,
            password
        });

        var tokens: Tokens = response.data as Tokens;
        return tokens;
    }

    static async refreshAcessToken(refresh_token: string): Promise<string> {
        var response = await AxiosClient.post("/api/token/refresh", {
            "refresh": refresh_token
        });

        var access_token: string = response.data['access'];
        return access_token;
    }

    static async getSelfUser(): Promise<User> {
        var response = await AxiosClient.get(`/api/get-user`);


        return response.data as User;
    } 
}

export {AxiosClient}