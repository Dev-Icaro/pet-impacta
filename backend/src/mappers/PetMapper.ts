import { BaseMapper } from './BaseMapper';
import { Pet } from '../models/Pet';
import { CreatePetDTO } from '../dtos/pet/CreatePetDTO';
import { UpdatePetDTO } from '../dtos/pet/UpdatePetDTO';

export class PetMapper extends BaseMapper {
  /**
   * Converte dados do banco (snake_case) para Pet (camelCase)
   */
  public static fromDatabase(dbRow: any): Pet {
    return this.toCamelCaseObject<Pet>(dbRow);
  }

  /**
   * Converte array de dados do banco para array de Pet
   */
  public static fromDatabaseArray(dbRows: any[]): Pet[] {
    return dbRows.map(row => this.fromDatabase(row));
  }

  /**
   * Converte CreatePetDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseCreate(createPetDTO: CreatePetDTO): any {
    return this.toSnakeCaseObject(createPetDTO);
  }

  /**
   * Converte UpdatePetDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseUpdate(updatePetDTO: UpdatePetDTO): any {
    return this.toSnakeCaseObject(updatePetDTO);
  }

  /**
   * Converte Pet (camelCase) para dados do banco (snake_case)
   */
  public static toDatabase(pet: Pet): any {
    return this.toSnakeCaseObject(pet);
  }
}
