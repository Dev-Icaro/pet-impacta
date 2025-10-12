import { Veterinarian } from '../models/Veterinarian';
import { CreateVeterinarianDTO } from '../dtos/veterinarian/CreateVeterinarianDTO';
import { UpdateVeterinarianDTO } from '../dtos/veterinarian/UpdateVeterinarianDTO';
import { executeQuery } from '../config/database';

export class VeterinarianRepository {
  public async findAll(): Promise<Veterinarian[]> {
    const query = `
      SELECT 
        id,
        name,
        license_number,
        phone,
        email,
        created_at,
        updated_at
      FROM veterinarians
      ORDER BY created_at DESC
    `;

    const result = await executeQuery(query);
    return result.rows.map(row => this.mapFromDatabase(row));
  }

  public async findById(id: string): Promise<Veterinarian | null> {
    const query = `
      SELECT 
        id,
        name,
        license_number,
        phone,
        email,
        created_at,
        updated_at
      FROM veterinarians
      WHERE id = $1
    `;

    const result = await executeQuery(query, [id]);
    return result.rows[0] ? this.mapFromDatabase(result.rows[0]) : null;
  }

  public async create(createVeterinarianDTO: CreateVeterinarianDTO): Promise<Veterinarian> {
    const query = `
      INSERT INTO veterinarians (
        name,
        license_number,
        phone,
        email
      ) VALUES ($1, $2, $3, $4)
      RETURNING 
        id,
        name,
        license_number,
        phone,
        email,
        created_at,
        updated_at
    `;

    const values = [
      createVeterinarianDTO.name,
      createVeterinarianDTO.licenseNumber,
      createVeterinarianDTO.phone || null,
      createVeterinarianDTO.email || null,
    ];

    const result = await executeQuery(query, values);
    return this.mapFromDatabase(result.rows[0]);
  }

  public async update(id: string, updateVeterinarianDTO: UpdateVeterinarianDTO): Promise<Veterinarian | null> {
    // Construir dinamicamente os campos a serem atualizados
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updateVeterinarianDTO.name !== undefined) {
      updateFields.push(`name = $${paramIndex++}`);
      values.push(updateVeterinarianDTO.name);
    }
    if (updateVeterinarianDTO.licenseNumber !== undefined) {
      updateFields.push(`license_number = $${paramIndex++}`);
      values.push(updateVeterinarianDTO.licenseNumber);
    }
    if (updateVeterinarianDTO.phone !== undefined) {
      updateFields.push(`phone = $${paramIndex++}`);
      values.push(updateVeterinarianDTO.phone);
    }
    if (updateVeterinarianDTO.email !== undefined) {
      updateFields.push(`email = $${paramIndex++}`);
      values.push(updateVeterinarianDTO.email);
    }

    if (updateFields.length === 0) {
      // Se não há campos para atualizar, retorna o veterinário atual
      return this.findById(id);
    }

    // Adicionar updated_at
    updateFields.push(`updated_at = NOW()`);
    values.push(id); // ID como último parâmetro

    const query = `
      UPDATE veterinarians 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        id,
        name,
        license_number,
        phone,
        email,
        created_at,
        updated_at
    `;

    const result = await executeQuery(query, values);
    return result.rows[0] ? this.mapFromDatabase(result.rows[0]) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM veterinarians WHERE id = $1';
    const result = await executeQuery(query, [id]);
    return result.rowCount > 0;
  }

  public async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM veterinarians WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [id]);
    return result.rows.length > 0;
  }

  public async count(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM veterinarians';
    const result = await executeQuery<{ count: string }>(query);
    return parseInt(result.rows[0].count);
  }

  private mapFromDatabase(row: any): Veterinarian {
    return {
      id: row.id,
      name: row.name,
      licenseNumber: row.license_number,
      phone: row.phone,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
