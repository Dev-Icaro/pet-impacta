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

// Tipos para Veterinário
export interface Veterinarian {
  id: string;
  name: string;
  licenseNumber: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVeterinarianDTO {
  name: string;
  licenseNumber: string;
  phone?: string;
  email?: string;
}

export interface UpdateVeterinarianDTO {
  name?: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
}

export interface VeterinarianApiResponse {
  success: boolean;
  message: string;
  data?: Veterinarian;
  total?: number;
}

export interface VeterinarianListApiResponse {
  success: boolean;
  message: string;
  data?: Veterinarian[];
  total?: number;
}

// Tipos para Serviço
export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDTO {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  price?: number;
}

export interface ServiceApiResponse {
  success: boolean;
  message: string;
  data?: Service;
  total?: number;
}

export interface ServiceListApiResponse {
  success: boolean;
  message: string;
  data?: Service[];
  total?: number;
}
