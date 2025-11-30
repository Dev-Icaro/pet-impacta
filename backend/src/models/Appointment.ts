export interface Appointment {
  id: string;
  petId: string;
  serviceId: string;
  veterinarianId: string;
  appointmentDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para agendamento com dados populados (para retorno da API)
export interface AppointmentWithDetails extends Appointment {
  petName?: string;
  serviceName?: string;
  veterinarianName?: string;
  servicePrice?: number;
}

export class AppointmentModel implements Appointment {
  public readonly id: string;
  public petId: string;
  public serviceId: string;
  public veterinarianId: string;
  public appointmentDate: Date;
  public notes?: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    petId: string,
    serviceId: string,
    veterinarianId: string,
    appointmentDate: Date,
    notes?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id || '';
    this.petId = petId;
    this.serviceId = serviceId;
    this.veterinarianId = veterinarianId;
    this.appointmentDate = appointmentDate;
    this.notes = notes;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public update(data: Partial<Omit<Appointment, 'id' | 'createdAt'>>): void {
    this.petId = data.petId ?? this.petId;
    this.serviceId = data.serviceId ?? this.serviceId;
    this.veterinarianId = data.veterinarianId ?? this.veterinarianId;
    this.appointmentDate = data.appointmentDate ?? this.appointmentDate;
    this.notes = data.notes ?? this.notes;
    this.updatedAt = new Date();
  }

  public toJSON(): Appointment {
    return {
      id: this.id,
      petId: this.petId,
      serviceId: this.serviceId,
      veterinarianId: this.veterinarianId,
      appointmentDate: this.appointmentDate,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Método para criar AppointmentModel a partir dos dados do banco
  public static fromDatabase(data: any): AppointmentModel {
    return new AppointmentModel(
      data.petId,
      data.serviceId,
      data.veterinarianId,
      data.appointmentDate,
      data.notes,
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }
}

