export interface CreatePetDTO {
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

export interface CreatePetRequest {
  body: CreatePetDTO;
}

export interface CreatePetResponse {
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
