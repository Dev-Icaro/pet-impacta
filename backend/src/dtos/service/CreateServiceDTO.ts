export interface CreateServiceDTO {
  name: string;
  description?: string;
  price: number;
}

export interface CreateServiceRequest {
  body: CreateServiceDTO;
}

export interface CreateServiceResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
