import { Veterinarian } from '../../models/Veterinarian';

export interface GetVeterinarianRequest {
  params: {
    id: string;
  };
}

export interface GetVeterinarianResponse {
  success: boolean;
  message: string;
  data?: Veterinarian;
}

export interface GetAllVeterinariansResponse {
  success: boolean;
  message: string;
  data: Veterinarian[];
  total: number;
}
