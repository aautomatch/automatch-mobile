import { InstructorPublic } from "../app/types/instructor-public";

export interface InstructorCardModel {
  id: string;
  full_name: string;
  email: string;
  profile_image?: string;
  address?: {
    city?: string;
  };
  instructor_details: {
    hourly_rate: number;
    average_rating: number;
    years_experience: number;
    is_verified: boolean;
    total_reviews: number;
    bio: string;
    license_types: string[];
  };
}

export const InstructorAdapter = {
  fromPublic(api: InstructorPublic): InstructorCardModel {
    return {
      id: api.user.id,
      full_name: api.user.fullName,
      email: api.user.email,
      profile_image: api.user.profileImageUrl,
      address: {
        city: api.city
      },
      instructor_details: {
        hourly_rate: api.hourlyRate,
        average_rating: api.averageRating,
        years_experience: api.yearsExperience,
        is_verified: api.isVerified,
        total_reviews: api.totalReviews,
        bio: api.bio,
        license_types: ['B'] // até o backend mandar isso
      }
    };
  }
};
