import { LoginRequest } from "../app/types/login-request";
import { TokenResponse } from "../app/types/toke-response";
import { User } from "../app/types/user";
import { api } from "./api";
//TODO lembrar de gravar o accesstoken no localStorage(no response do loggin):
//localStorage.setItem("accessToken", response.data.accessToken);
const AUTH_URL = "/auth";

export const AuthService = {
  register(user: User) {
    return api.post<User>(`${AUTH_URL}/register`, user);
  },

  login(data: LoginRequest) {
    return api.post<TokenResponse>(`${AUTH_URL}/login`, data);
  }
};
