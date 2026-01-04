import { Instructor, Lesson, User, Vehicle, Review } from '../types';

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    full_name: 'Carlos Silva',
    email: 'carlos@autoescola.com',
    phone: '(11) 98765-4321',
    user_type_id: 1,
    user_type: 'INSTRUCTOR',
    is_active: true,
    profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    created_at: '2024-01-15',
    instructor_details: {
      hourly_rate: 80,
      bio: 'Instrutor com mais de 10 anos de experiência. Especializado em alunos iniciantes e nervosos.',
      years_experience: 10,
      is_verified: true,
      average_rating: 4.8,
      total_reviews: 124,
      license_types: ['B', 'C']
    },
    address: {
      id: 'addr1',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01310-100',
      country: 'Brasil'
    }
  },
  {
    id: '2',
    full_name: 'Ana Santos',
    email: 'ana@autoescola.com',
    phone: '(11) 97654-3210',
    user_type_id: 1,
    user_type: 'INSTRUCTOR',
    is_active: true,
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    created_at: '2024-02-10',
    instructor_details: {
      hourly_rate: 75,
      bio: 'Instrutora paciente e dedicada. Experiência com veículos automáticos e manuais.',
      years_experience: 7,
      is_verified: true,
      average_rating: 4.9,
      total_reviews: 98,
      license_types: ['A', 'B']
    },
    address: {
      id: 'addr2',
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01305-000',
      country: 'Brasil'
    }
  },
  {
    id: '3',
    full_name: 'Roberto Oliveira',
    email: 'roberto@autoescola.com',
    phone: '(11) 96543-2109',
    user_type_id: 1,
    user_type: 'INSTRUCTOR',
    is_active: true,
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    created_at: '2024-01-20',
    instructor_details: {
      hourly_rate: 85,
      bio: 'Especialista em preparação para exames de direção. Alta taxa de aprovação.',
      years_experience: 12,
      is_verified: true,
      average_rating: 4.7,
      total_reviews: 156,
      license_types: ['B', 'C', 'D']
    },
    address: {
      id: 'addr3',
      street: 'Av. Faria Lima',
      number: '2000',
      neighborhood: 'Itaim Bibi',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01452-000',
      country: 'Brasil'
    }
  },
  {
    id: '4',
    full_name: 'Juliana Costa',
    email: 'juliana@autoescola.com',
    phone: '(11) 95432-1098',
    user_type_id: 1,
    user_type: 'INSTRUCTOR',
    is_active: true,
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    created_at: '2024-03-05',
    instructor_details: {
      hourly_rate: 70,
      bio: 'Instrutora jovem e dinâmica. Metodologia moderna de ensino.',
      years_experience: 5,
      is_verified: true,
      average_rating: 4.9,
      total_reviews: 67,
      license_types: ['A', 'B']
    },
    address: {
      id: 'addr4',
      street: 'Rua Oscar Freire',
      number: '800',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01426-001',
      country: 'Brasil'
    }
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    instructor_id: '1',
    license_plate: 'ABC-1234',
    model: 'Onix',
    brand: 'Chevrolet',
    year: 2023,
    color: 'Branco',
    vehicle_image_url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
    transmission_type: 'MANUAL',
    category: 'HATCH',
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: true
  },
  {
    id: 'v2',
    instructor_id: '2',
    license_plate: 'DEF-5678',
    model: 'HB20',
    brand: 'Hyundai',
    year: 2022,
    color: 'Prata',
    vehicle_image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    transmission_type: 'AUTOMATIC',
    category: 'HATCH',
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: true
  },
  {
    id: 'v3',
    instructor_id: '3',
    license_plate: 'GHI-9012',
    model: 'Civic',
    brand: 'Honda',
    year: 2023,
    color: 'Preto',
    vehicle_image_url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    transmission_type: 'AUTOMATIC',
    category: 'SEDAN',
    has_dual_controls: true,
    has_air_conditioning: true,
    is_approved: true,
    is_available: true
  }
];

export const mockCurrentUser: User = {
  id: 'student1',
  full_name: 'João Pedro',
  email: 'joao@email.com',
  phone: '(11) 99999-8888',
  user_type_id: 2,
  user_type: 'STUDENT',
  is_active: true,
  profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  created_at: '2024-03-01',
  address: {
    id: 'addr5',
    street: 'Rua da Consolação',
    number: '1500',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zip_code: '01301-000',
    country: 'Brasil'
  }
};

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    instructor_id: '1',
    student_id: 'student1',
    vehicle_id: 'v1',
    scheduled_at: '2026-01-10T10:00:00',
    duration_minutes: 60,
    status: 'COMPLETED',
    price: 80,
    payment_status: 'PAID',
    payment_method: 'PIX',
    created_at: '2026-01-03'
  },
  {
    id: 'l2',
    instructor_id: '2',
    student_id: 'student1',
    vehicle_id: 'v2',
    scheduled_at: '2026-01-06T14:00:00',
    duration_minutes: 90,
    status: 'SCHEDULED',
    price: 112.50,
    payment_status: 'PENDING',
    created_at: '2026-01-04'
  },
  {
    id: 'l3',
    instructor_id: '1',
    student_id: 'student1',
    vehicle_id: 'v1',
    scheduled_at: '2026-01-08T09:00:00',
    duration_minutes: 60,
    status: 'SCHEDULED',
    price: 80,
    payment_status: 'PENDING',
    created_at: '2026-01-04'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    lesson_id: 'l1',
    rating: 5,
    comment: 'Excelente instrutor! Muito paciente e didático.',
    created_at: '2026-01-10'
  }
];

export const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
];
