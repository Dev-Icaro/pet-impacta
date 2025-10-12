export interface Veterinarian {
  id: string;
  name: string;
  licenseNumber: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class VeterinarianModel implements Veterinarian {
  public readonly id: string;
  public name: string;
  public licenseNumber: string;
  public phone?: string;
  public email?: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    name: string,
    licenseNumber: string,
    phone?: string,
    email?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id || '';
    this.name = name;
    this.licenseNumber = licenseNumber;
    this.phone = phone;
    this.email = email;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public update(data: Partial<Omit<Veterinarian, 'id' | 'createdAt'>>): void {
    this.name = data.name ?? this.name;
    this.licenseNumber = data.licenseNumber ?? this.licenseNumber;
    this.phone = data.phone ?? this.phone;
    this.email = data.email ?? this.email;
    this.updatedAt = new Date();
  }

  public toJSON(): Veterinarian {
    return {
      id: this.id,
      name: this.name,
      licenseNumber: this.licenseNumber,
      phone: this.phone,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Método para criar VeterinarianModel a partir dos dados do banco
  public static fromDatabase(data: any): VeterinarianModel {
    return new VeterinarianModel(
      data.name,
      data.licenseNumber,
      data.phone,
      data.email,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }
}
