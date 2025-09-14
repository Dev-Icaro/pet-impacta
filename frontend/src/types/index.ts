// Tipos básicos do projeto
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para Pet
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetDTO {
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

export interface UpdatePetDTO {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
}

export interface PetApiResponse {
  success: boolean;
  message: string;
  data?: Pet;
  total?: number;
}

export interface PetListApiResponse {
  success: boolean;
  message: string;
  data?: Pet[];
  total?: number;
}
