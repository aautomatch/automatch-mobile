import { LoginRequest } from "../app/types/login-request";
import { TokenResponse } from "../app/types/toke-response";
import { User } from "../app/types/user";
import { api } from "./api";

// const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  register(user: User) {
    console.log(user)
    return api.post<User>(`localhost:8080/auth/register`, user);
  },

  login(data: LoginRequest) {
    return api.post<TokenResponse>(`/auth/login`, data);
  }
};
