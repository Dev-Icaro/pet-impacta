export interface GetAppointmentRequest {
  params: {
    id: string;
  };
}

export interface GetAppointmentResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    petId: string;
    serviceId: string;
    veterinarianId: string;
    appointmentDate: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    petName?: string;
    serviceName?: string;
    veterinarianName?: string;
    servicePrice?: number;
  };
}

export interface GetAllAppointmentsResponse {
  success: boolean;
  message: string;
  data?: Array<{
    id: string;
    petId: string;
    serviceId: string;
    veterinarianId: string;
    appointmentDate: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    petName?: string;
    serviceName?: string;
    veterinarianName?: string;
    servicePrice?: number;
  }>;
  total?: number;
}

