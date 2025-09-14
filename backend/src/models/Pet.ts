export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PetModel implements Pet {
  public readonly id: string;
  public name: string;
  public species: string;
  public breed: string;
  public age: number;
  public ownerName: string;
  public ownerPhone: string;
  public ownerEmail: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    name: string,
    species: string,
    breed: string,
    age: number,
    ownerName: string,
    ownerPhone: string,
    ownerEmail: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id || '';
    this.name = name;
    this.species = species;
    this.breed = breed;
    this.age = age;
    this.ownerName = ownerName;
    this.ownerPhone = ownerPhone;
    this.ownerEmail = ownerEmail;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public update(data: Partial<Omit<Pet, 'id' | 'createdAt'>>): void {
    this.name = data.name ?? this.name;
    this.species = data.species ?? this.species;
    this.breed = data.breed ?? this.breed;
    this.age = data.age ?? this.age;
    this.ownerName = data.ownerName ?? this.ownerName;
    this.ownerPhone = data.ownerPhone ?? this.ownerPhone;
    this.ownerEmail = data.ownerEmail ?? this.ownerEmail;
    this.updatedAt = new Date();
  }

  public toJSON(): Pet {
    return {
      id: this.id,
      name: this.name,
      species: this.species,
      breed: this.breed,
      age: this.age,
      ownerName: this.ownerName,
      ownerPhone: this.ownerPhone,
      ownerEmail: this.ownerEmail,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Método para criar PetModel a partir dos dados do banco
  public static fromDatabase(data: any): PetModel {
    return new PetModel(
      data.name,
      data.species,
      data.breed,
      data.age,
      data.ownerName,
      data.ownerPhone,
      data.ownerEmail,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }
}
