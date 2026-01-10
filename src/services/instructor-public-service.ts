import { InstructorSearch } from '../app/types/instructor-search';
import { InstructorPublic } from '../app/types/instructor-public';
import { api } from './api';

const API_URL = import.meta.env.VITE_API_URL;

export const InstructorService = {
  getAll() {
    return api.get<InstructorPublic[]>(
      `${API_URL}/public/instructor`
    );
  },

  search(params: InstructorSearch) {
    return api.get<InstructorPublic[]>(
      `${API_URL}/public/instructor/search`,
      { params }
    );
  }
};