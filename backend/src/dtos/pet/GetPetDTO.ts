export interface GetPetRequest {
  params: {
    id: string;
  };
}

export interface GetPetResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface GetAllPetsResponse {
  success: boolean;
  message: string;
  data?: Array<{
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total?: number;
}
