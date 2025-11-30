export interface DeleteAppointmentRequest {
  params: {
    id: string;
  };
}

export interface DeleteAppointmentResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    deletedAt: Date;
  };
}

