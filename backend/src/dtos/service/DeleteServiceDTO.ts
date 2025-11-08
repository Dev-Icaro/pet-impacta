export interface DeleteServiceRequest {
  params: {
    id: string;
  };
}

export interface DeleteServiceResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    deletedAt: Date;
  };
}
