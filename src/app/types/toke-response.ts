import { User } from "./user";

export interface TokenResponse {
  accessToken: string;
  tokenType: string; // "Bearer"
  expiresIn: number;
  user: User;
}
