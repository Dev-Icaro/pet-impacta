export interface DeleteVeterinarianRequest {
  params: {
    id: string;
  };
}

export interface DeleteVeterinarianResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    deletedAt: Date;
  };
}
