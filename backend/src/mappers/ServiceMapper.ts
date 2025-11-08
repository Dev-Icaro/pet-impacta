import { BaseMapper } from './BaseMapper';
import { Service } from '../models/Service';
import { CreateServiceDTO } from '../dtos/service/CreateServiceDTO';
import { UpdateServiceDTO } from '../dtos/service/UpdateServiceDTO';

export class ServiceMapper extends BaseMapper {
  /**
   * Converte dados do banco (snake_case) para Service (camelCase)
   */
  public static fromDatabase(dbRow: any): Service {
    return this.toCamelCaseObject<Service>(dbRow);
  }

  /**
   * Converte array de dados do banco para array de Service
   */
  public static fromDatabaseArray(dbRows: any[]): Service[] {
    return dbRows.map(row => this.fromDatabase(row));
  }

  /**
   * Converte CreateServiceDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseCreate(createServiceDTO: CreateServiceDTO): any {
    return this.toSnakeCaseObject(createServiceDTO);
  }

  /**
   * Converte UpdateServiceDTO (camelCase) para dados do banco (snake_case)
   */
  public static toDatabaseUpdate(updateServiceDTO: UpdateServiceDTO): any {
    return this.toSnakeCaseObject(updateServiceDTO);
  }

  /**
   * Converte Service (camelCase) para dados do banco (snake_case)
   */
  public static toDatabase(service: Service): any {
    return this.toSnakeCaseObject(service);
  }
}
