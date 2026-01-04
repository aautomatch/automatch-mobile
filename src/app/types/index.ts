export interface Classifier {
  id: number;
  type: string;
  value: string;
  description: string;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  user_type_id: number;
  user_type: 'INSTRUCTOR' | 'STUDENT';
  is_active: boolean;
  profile_image_url?: string;
  address?: Address;
  created_at: string;
}

export interface Instructor extends User {
  instructor_details: {
    hourly_rate: number;
    bio?: string;
    years_experience: number;
    is_verified: boolean;
    average_rating: number;
    total_reviews: number;
    license_types: string[];
  };
  vehicles?: Vehicle[];
  availability?: InstructorAvailability[];
}

export interface Vehicle {
  id: string;
  instructor_id: string;
  license_plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  vehicle_image_url?: string;
  transmission_type: string;
  category: string;
  has_dual_controls: boolean;
  has_air_conditioning: boolean;
  is_approved: boolean;
  is_available: boolean;
  last_maintenance_date?: string;
}

export interface Lesson {
  id: string;
  instructor_id: string;
  instructor?: Instructor;
  student_id: string;
  student?: User;
  vehicle_id: string;
  vehicle?: Vehicle;
  scheduled_at: string;
  duration_minutes: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  address?: Address;
  price: number;
  payment_status: 'PENDING' | 'PAID' | 'REFUNDED';
  payment_method?: string;
  created_at: string;
  completed_at?: string;
}

export interface Review {
  id: string;
  lesson_id: string;
  lesson?: Lesson;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface InstructorAvailability {
  id: string;
  instructor_id: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  start_time: string;
  end_time: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  document_type: string;
  document_number: string;
  document_image_url: string;
  issue_date?: string;
  expiry_date?: string;
  is_verified: boolean;
}
