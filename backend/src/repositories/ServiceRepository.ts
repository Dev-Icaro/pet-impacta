import { Service, ServiceModel } from '../models/Service';
import { CreateServiceDTO } from '../dtos/service/CreateServiceDTO';
import { UpdateServiceDTO } from '../dtos/service/UpdateServiceDTO';
import { executeQuery } from '../config/database';
import { ServiceMapper } from '../mappers/ServiceMapper';

export class ServiceRepository {
  public async findAll(): Promise<Service[]> {
    const query = `
      SELECT 
        id,
        name,
        description,
        price,
        created_at,
        updated_at
      FROM services
      ORDER BY created_at DESC
    `;

    const result = await executeQuery(query);
    return ServiceMapper.fromDatabaseArray(result.rows);
  }

  public async findById(id: string): Promise<Service | null> {
    const query = `
      SELECT 
        id,
        name,
        description,
        price,
        created_at,
        updated_at
      FROM services
      WHERE id = $1
    `;

    const result = await executeQuery(query, [id]);
    return result.rows[0] ? ServiceMapper.fromDatabase(result.rows[0]) : null;
  }

  public async create(createServiceDTO: CreateServiceDTO): Promise<Service> {
    const dbData = ServiceMapper.toDatabaseCreate(createServiceDTO);

    const query = `
      INSERT INTO services (
        name,
        description,
        price
      ) VALUES ($1, $2, $3)
      RETURNING 
        id,
        name,
        description,
        price,
        created_at,
        updated_at
    `;

    const values = [dbData.name, dbData.description, dbData.price];

    const result = await executeQuery(query, values);
    return ServiceMapper.fromDatabase(result.rows[0]);
  }

  public async update(id: string, updateServiceDTO: UpdateServiceDTO): Promise<Service | null> {
    const dbData = ServiceMapper.toDatabaseUpdate(updateServiceDTO);

    // Construir dinamicamente os campos a serem atualizados
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dbData.name !== undefined) {
      updateFields.push(`name = $${paramIndex++}`);
      values.push(dbData.name);
    }
    if (dbData.description !== undefined) {
      updateFields.push(`description = $${paramIndex++}`);
      values.push(dbData.description);
    }
    if (dbData.price !== undefined) {
      updateFields.push(`price = $${paramIndex++}`);
      values.push(dbData.price);
    }

    if (updateFields.length === 0) {
      // Se não há campos para atualizar, retorna o serviço atual
      return this.findById(id);
    }

    // Adicionar updated_at
    updateFields.push(`updated_at = NOW()`);
    values.push(id); // ID como último parâmetro

    const query = `
      UPDATE services 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        id,
        name,
        description,
        price,
        created_at,
        updated_at
    `;

    const result = await executeQuery(query, values);
    return result.rows[0] ? ServiceMapper.fromDatabase(result.rows[0]) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM services WHERE id = $1';
    const result = await executeQuery(query, [id]);
    return result.rowCount > 0;
  }

  public async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM services WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [id]);
    return result.rows.length > 0;
  }

  public async count(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM services';
    const result = await executeQuery<{ count: string }>(query);
    return parseInt(result.rows[0].count);
  }
}
