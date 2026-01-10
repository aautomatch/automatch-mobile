import { UserRole } from "./user-role";
import { Address } from "./address";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  isActive?: boolean;
  profileImageUrl?: string;
  address: Address;
}
