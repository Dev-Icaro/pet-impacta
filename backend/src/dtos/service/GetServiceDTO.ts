export interface GetServiceRequest {
  params: {
    id: string;
  };
}

export interface GetServiceResponse {
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

export interface GetAllServicesResponse {
  success: boolean;
  message: string;
  data?: Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total?: number;
}
