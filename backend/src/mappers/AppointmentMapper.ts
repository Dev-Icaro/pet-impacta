import { BaseMapper } from './BaseMapper';
import { Appointment, AppointmentWithDetails } from '../models/Appointment';
import { CreateAppointmentDTO } from '../dtos/appointment/CreateAppointmentDTO';
import { UpdateAppointmentDTO } from '../dtos/appointment/UpdateAppointmentDTO';

export class AppointmentMapper extends BaseMapper {
  /**
   * Converte dados do banco (snake_case) para Appointment (camelCase)
   */
  public static fromDatabase(dbRow: any): Appointment {
    return this.toCamelCaseObject<Appointment>(dbRow);
  }

  /**
   * Converte dados do banco com JOIN para AppointmentWithDetails
   */
  public static fromDatabaseWithDetails(dbRow: any): AppointmentWithDetails {
    const baseAppointment = this.toCamelCaseObject<any>(dbRow);
    
    return {
      id: baseAppointment.id,
      petId: baseAppointment.petId,
      serviceId: baseAppointment.serviceId,
      veterinarianId: baseAppointment.veterinarianId,
      appointmentDate: baseAppointment.appointmentDate,
      notes: baseAppointment.notes,
      createdAt: baseAppointment.createdAt,
      updatedAt: baseAppointment.updatedAt,
      petName: baseAppointment.petName,
      serviceName: baseAppointment.serviceName,
      veterinarianName: baseAppointment.veterinarianName,
      servicePrice: baseAppointment.servicePrice,
    };
  }

  /**
   * Converte array de dados do banco para array de Appointment
   */
  public static fromDatabaseArray(dbRows: any[]): Appointment[] {
    return dbRows.map(row => this.fromDatabase(row));
  }

  /**
   * Converte array de dados do banco com detalhes para array de AppointmentWithDetails
   */
  public static fromDatabaseWithDetailsArray(dbRows: any[]): AppointmentWithDetails[] {
    return dbRows.map(row => this.fromDatabaseWithDetails(row));
  }

  /**
   * Converte CreateAppointmentDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseCreate(createAppointmentDTO: CreateAppointmentDTO): any {
    return this.toSnakeCaseObject(createAppointmentDTO);
  }

  /**
   * Converte UpdateAppointmentDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseUpdate(updateAppointmentDTO: UpdateAppointmentDTO): any {
    return this.toSnakeCaseObject(updateAppointmentDTO);
  }

  /**
   * Converte Appointment (camelCase) para dados do banco (snake_case)
   */
  public static toDatabase(appointment: Appointment): any {
    return this.toSnakeCaseObject(appointment);
  }
}

