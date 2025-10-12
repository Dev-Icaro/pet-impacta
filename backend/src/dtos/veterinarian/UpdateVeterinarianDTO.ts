export interface UpdateVeterinarianDTO {
  name?: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
}

export interface UpdateVeterinarianRequest {
  params: {
    id: string;
  };
  body: UpdateVeterinarianDTO;
}

export interface UpdateVeterinarianResponse {
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
