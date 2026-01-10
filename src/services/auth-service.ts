import { LoginRequest } from "../app/types/login-request";
import { TokenResponse } from "../app/types/toke-response";
import { User } from "../app/types/user";
import { api } from "./api";


export const AuthService = {
  register(user: User) {
    return api.post<User>('localhost:8080/register', user);
  },

  login(data: LoginRequest) {
    return api.post<TokenResponse>('localhost:8080/login', data);
  }
};
