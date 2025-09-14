export interface UpdatePetDTO {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
}

export interface UpdatePetRequest {
  params: {
    id: string;
  };
  body: UpdatePetDTO;
}

export interface UpdatePetResponse {
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
