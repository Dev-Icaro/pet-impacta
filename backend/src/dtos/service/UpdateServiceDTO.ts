export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  price?: number;
}

export interface UpdateServiceRequest {
  params: {
    id: string;
  };
  body: UpdateServiceDTO;
}

export interface UpdateServiceResponse {
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
