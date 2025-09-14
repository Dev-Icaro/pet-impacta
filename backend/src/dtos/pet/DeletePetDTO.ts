export interface DeletePetRequest {
  params: {
    id: string;
  };
}

export interface DeletePetResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    deletedAt: Date;
  };
}
