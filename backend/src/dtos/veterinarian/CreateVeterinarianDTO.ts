export interface CreateVeterinarianDTO {
  name: string;
  licenseNumber: string;
  phone?: string;
  email?: string;
}

export interface CreateVeterinarianRequest {
  body: CreateVeterinarianDTO;
}

export interface CreateVeterinarianResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    licenseNumber: string;
    phone?: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
