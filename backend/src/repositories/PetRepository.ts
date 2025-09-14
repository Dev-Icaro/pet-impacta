import { Pet, PetModel } from '../models/Pet';
import { CreatePetDTO } from '../dtos/pet/CreatePetDTO';
import { UpdatePetDTO } from '../dtos/pet/UpdatePetDTO';
import { executeQuery } from '../config/database';
import { PetMapper } from '../mappers/PetMapper';

export class PetRepository {
  public async findAll(): Promise<Pet[]> {
    const query = `
      SELECT 
        id,
        name,
        species,
        breed,
        age,
        owner_name,
        owner_phone,
        owner_email,
        created_at,
        updated_at
      FROM pets
      ORDER BY created_at DESC
    `;

    const result = await executeQuery(query);
    return PetMapper.fromDatabaseArray(result.rows);
  }

  public async findById(id: string): Promise<Pet | null> {
    const query = `
      SELECT 
        id,
        name,
        species,
        breed,
        age,
        owner_name,
        owner_phone,
        owner_email,
        created_at,
        updated_at
      FROM pets
      WHERE id = $1
    `;

    const result = await executeQuery(query, [id]);
    return result.rows[0] ? PetMapper.fromDatabase(result.rows[0]) : null;
  }

  public async create(createPetDTO: CreatePetDTO): Promise<Pet> {
    const dbData = PetMapper.toDatabaseCreate(createPetDTO);

    const query = `
      INSERT INTO pets (
        name,
        species,
        breed,
        age,
        owner_name,
        owner_phone,
        owner_email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id,
        name,
        species,
        breed,
        age,
        owner_name,
        owner_phone,
        owner_email,
        created_at,
        updated_at
    `;

    const values = [
      dbData.name,
      dbData.species,
      dbData.breed,
      dbData.age,
      dbData.owner_name,
      dbData.owner_phone,
      dbData.owner_email,
    ];

    const result = await executeQuery(query, values);
    return PetMapper.fromDatabase(result.rows[0]);
  }

  public async update(id: string, updatePetDTO: UpdatePetDTO): Promise<Pet | null> {
    const dbData = PetMapper.toDatabaseUpdate(updatePetDTO);

    // Construir dinamicamente os campos a serem atualizados
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (dbData.name !== undefined) {
      updateFields.push(`name = $${paramIndex++}`);
      values.push(dbData.name);
    }
    if (dbData.species !== undefined) {
      updateFields.push(`species = $${paramIndex++}`);
      values.push(dbData.species);
    }
    if (dbData.breed !== undefined) {
      updateFields.push(`breed = $${paramIndex++}`);
      values.push(dbData.breed);
    }
    if (dbData.age !== undefined) {
      updateFields.push(`age = $${paramIndex++}`);
      values.push(dbData.age);
    }
    if (dbData.owner_name !== undefined) {
      updateFields.push(`owner_name = $${paramIndex++}`);
      values.push(dbData.owner_name);
    }
    if (dbData.owner_phone !== undefined) {
      updateFields.push(`owner_phone = $${paramIndex++}`);
      values.push(dbData.owner_phone);
    }
    if (dbData.owner_email !== undefined) {
      updateFields.push(`owner_email = $${paramIndex++}`);
      values.push(dbData.owner_email);
    }

    if (updateFields.length === 0) {
      // Se não há campos para atualizar, retorna o pet atual
      return this.findById(id);
    }

    // Adicionar updated_at
    updateFields.push(`updated_at = NOW()`);
    values.push(id); // ID como último parâmetro

    const query = `
      UPDATE pets 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        id,
        name,
        species,
        breed,
        age,
        owner_name,
        owner_phone,
        owner_email,
        created_at,
        updated_at
    `;

    const result = await executeQuery(query, values);
    return result.rows[0] ? PetMapper.fromDatabase(result.rows[0]) : null;
  }

  public async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM pets WHERE id = $1';
    const result = await executeQuery(query, [id]);
    return result.rowCount > 0;
  }

  public async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM pets WHERE id = $1 LIMIT 1';
    const result = await executeQuery(query, [id]);
    return result.rows.length > 0;
  }

  public async count(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM pets';
    const result = await executeQuery<{ count: string }>(query);
    return parseInt(result.rows[0].count);
  }
}
