export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceModel implements Service {
  public readonly id: string;
  public name: string;
  public description?: string;
  public price: number;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(name: string, price: number, description?: string, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id || '';
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public update(data: Partial<Omit<Service, 'id' | 'createdAt'>>): void {
    this.name = data.name ?? this.name;
    this.description = data.description ?? this.description;
    this.price = data.price ?? this.price;
    this.updatedAt = new Date();
  }

  public toJSON(): Service {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Método para criar ServiceModel a partir dos dados do banco
  public static fromDatabase(data: any): ServiceModel {
    return new ServiceModel(data.name, data.price, data.description, data.id, data.createdAt, data.updatedAt);
  }
}
