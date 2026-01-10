import { LoginRequest } from "../app/types/login-request";
import { TokenResponse } from "../app/types/toke-response";
import { User } from "../app/types/user";
import { api } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  register(user: User) {
    return api.post<User>(`${API_URL}/register`, user);
  },

  login(data: LoginRequest) {
    return api.post<TokenResponse>(`${API_URL}/login`, data);
  }
};
