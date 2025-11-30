export interface UpdateAppointmentDTO {
  petId?: string;
  serviceId?: string;
  veterinarianId?: string;
  appointmentDate?: Date | string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  params: {
    id: string;
  };
  body: UpdateAppointmentDTO;
}

export interface UpdateAppointmentResponse {
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

