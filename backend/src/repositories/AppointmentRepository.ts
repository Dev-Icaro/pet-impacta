import { Appointment, AppointmentWithDetails } from '../models/Appointment';
import { CreateAppointmentDTO } from '../dtos/appointment/CreateAppointmentDTO';
import { UpdateAppointmentDTO } from '../dtos/appointment/UpdateAppointmentDTO';
import { executeQuery } from '../config/database';
import { AppointmentMapper } from '../mappers/AppointmentMapper';

export class AppointmentRepository {
  public async findAll(): Promise<AppointmentWithDetails[]> {
    const query = `
      SELECT 
        a.id,
        a.pet_id,
        a.service_id,
        a.veterinarian_id,
        a.appointment_date,
        a.notes,
        a.created_at,
        a.updated_at,
        p.name as pet_name,
        s.name as service_name,
        s.price as service_price,
        v.name as veterinarian_name
      FROM appointments a
      INNER JOIN pets p ON a.pet_id = p.id
      INNER JOIN services s ON a.service_id = s.id
      INNER JOIN veterinarians v ON a.veterinarian_id = v.id
      ORDER BY a.appointment_date DESC
    `;

    const result = await executeQuery(query);
    return AppointmentMapper.fromDatabaseWithDetailsArray(result.rows);
  }

  public async findById(id: string): Promise<AppointmentWithDetails | null> {
    const query = `
      SELECT 
        a.id,
        a.pet_id,
        a.service_id,
        a.veterinarian_id,
        a.appointment_date,
        a.notes,
        a.created_at,
        a.updated_at,
        p.name as pet_name,
        s.name as service_name,
        s.price as service_price,
        v.name as veterinarian_name
      FROM appointments a
      INNER JOIN pets p ON a.pet_id = p.id
      INNER JOIN services s ON a.service_id = s.id
      INNER JOIN veterinarians v ON a.veterinarian_id = v.id
      WHERE a.id = $1
    `;

    const result = await executeQuery(query, [id]);
    return result.rows[0] ? AppointmentMapper.fromDatabaseWithDetails(result.rows[0]) : null;
  }

  public async create(createAppointmentDTO: CreateAppointmentDTO): Promise<AppointmentWithDetails> {
    const dbData = AppointmentMapper.toDatabaseCreate(createAppointmentDTO);

    const query = `
      INSERT INTO appointments (
        pet_id,
        service_id,
        veterinarian_id,
        appointment_date,
        notes
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [
      dbData.pet_id,
      dbData.service_id,
      dbData.veterinarian_id,
      dbData.appointment_date,
      dbData.notes,
    ];

    const result = await executeQuery(query, values);
    const appointmentId = result.rows[0].id;

    // Buscar o agendamento criado com os dados populados
    const appointment = await this.findById(appointmentId);
    if (!appointment) {
      throw new Error('Erro ao buscar agendamento criado');
    }

    return appointment;
  }

  public async update(id: string, updateAppointmentDTO: UpdateAppointmentDTO): Promise<AppointmentWithDetails | null> {
    const dbData = AppointmentMapper.toDatabaseUpdate(updateAppointmentDTO);

    // Construir dinamicamente os campos a serem atualizados
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dbData.pet_id !== undefined) {
      updateFields.push(`pet_id = $${paramIndex++}`);
      values.push(dbData.pet_id);
    }
    if (dbData.service_id !== undefined) {
      updateFields.push(`service_id = $${paramIndex++}`);
      values.push(dbData.service_id);
    }
    if (dbData.veterinarian_id !== undefined) {
      updateFields.push(`veterinarian_id = $${paramIndex++}`);
      values.push(dbData.veterinarian_id);
    }
    if (dbData.appointment_date !== undefined) {
      updateFields.push(`appointment_date = $${paramIndex++}`);
      values.push(dbData.appointment_date);
    }
    if (dbData.notes !== undefined) {
      updateFields.push(`notes = $${paramIndex++}`);
      values.push(dbData.notes);
    }

    if (updateFields.length === 0) {
      // Se não há campos para atualizar, retorna o agendamento atual
      return this.findById(id);
    }

    // Adicionar updated_at
    updateFields.push(`updated_at = NOW()`);
    values.push(id); // ID como último parâmetro

    const query = `
      UPDATE appointments 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id
    `;

    const result = await executeQuery(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }

    // Buscar o agendamento atualizado com os dados populados
    return this.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM appointments WHERE id = $1';
    const result = await executeQuery(query, [id]);
    return result.rowCount > 0;
  }

  public async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM appointments WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [id]);
    return result.rows.length > 0;
  }

  public async count(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM appointments';
    const result = await executeQuery<{ count: string }>(query);
    return parseInt(result.rows[0].count);
  }

  // Métodos auxiliares para validação
  public async petExists(petId: string): Promise<boolean> {
    const query = 'SELECT 1 FROM pets WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [petId]);
    return result.rows.length > 0;
  }

  public async serviceExists(serviceId: string): Promise<boolean> {
    const query = 'SELECT 1 FROM services WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [serviceId]);
    return result.rows.length > 0;
  }

  public async veterinarianExists(veterinarianId: string): Promise<boolean> {
    const query = 'SELECT 1 FROM veterinarians WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [veterinarianId]);
    return result.rows.length > 0;
  }
}

