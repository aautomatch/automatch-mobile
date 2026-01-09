import { LoginRequest } from "../app/types/login-request";
import { TokenResponse } from "../app/types/toke-response";
import { User } from "../app/types/user";
import { api } from "./api";


export const AuthService = {
  register(user: User) {
    return api.post<User>(`${process.env.API_URL}/register`, user);
  },

  login(data: LoginRequest) {
    return api.post<TokenResponse>(`${process.env.API_URL}/login`, data);
  }
};
