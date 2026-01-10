export interface UserPublic {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
