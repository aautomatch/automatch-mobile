import { Address } from "node:cluster";
import { UserRole } from "./user-role";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
  profileImageUrl?: string;
  address?: Address;
  createdAt?: string; 
  updatedAt?: string;
  deletedAt?: string | null;
}
