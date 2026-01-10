import { User } from "./user";

export interface Instructor {
    user: User;
    hourlyRate: number;
    bio: string;
    yearsExperience: number;
    isVerified: boolean;
    averageRating: number;
    totalReviews: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}