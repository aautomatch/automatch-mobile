import { UserPublic } from './user-public';

export interface InstructorPublic {
  user: UserPublic;
  hourlyRate: number;
  bio: string;
  yearsExperience: number;
  isVerified: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  city?: string;
}
