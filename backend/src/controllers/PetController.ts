import { Request, Response } from 'express';
import { PetRepository } from '../repositories/PetRepository';
import { CreatePetDTO, CreatePetRequest, CreatePetResponse } from '../dtos/pet/CreatePetDTO';
import { UpdatePetDTO, UpdatePetRequest, UpdatePetResponse } from '../dtos/pet/UpdatePetDTO';
import { GetPetRequest, GetPetResponse, GetAllPetsResponse } from '../dtos/pet/GetPetDTO';
import { DeletePetRequest, DeletePetResponse } from '../dtos/pet/DeletePetDTO';

export class PetController {
  private petRepository: PetRepository;

  constructor() {
    this.petRepository = new PetRepository();
  }

  public getAllPets = async (req: Request, res: Response): Promise<void> => {
    try {
      const pets = await this.petRepository.findAll();
      const total = await this.petRepository.count();

      const response: GetAllPetsResponse = {
        success: true,
        message: 'Pets listados com sucesso',
        data: pets,
        total,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar pets:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public getPetById = async (req: GetPetRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do pet é obrigatório',
        });
        return;
      }

      const pet = await this.petRepository.findById(id);

      if (!pet) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      const response: GetPetResponse = {
        success: true,
        message: 'Pet encontrado com sucesso',
        data: pet,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar pet:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public createPet = async (req: CreatePetRequest, res: Response): Promise<void> => {
    try {
      const createPetDTO: CreatePetDTO = req.body;

      // Validação básica
      if (!createPetDTO.name || !createPetDTO.species || !createPetDTO.ownerName) {
        res.status(400).json({
          success: false,
          message: 'Nome, espécie e nome do proprietário são obrigatórios',
        });
        return;
      }

      if (createPetDTO.age < 0) {
        res.status(400).json({
          success: false,
          message: 'Idade deve ser um valor positivo',
        });
        return;
      }

      const pet = await this.petRepository.create(createPetDTO);

      const response: CreatePetResponse = {
        success: true,
        message: 'Pet criado com sucesso',
        data: pet,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar pet:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public updatePet = async (req: UpdatePetRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatePetDTO: UpdatePetDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do pet é obrigatório',
        });
        return;
      }

      // Verifica se o pet existe
      const petExists = await this.petRepository.exists(id);
      if (!petExists) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      // Validação de dados de atualização
      if (updatePetDTO.age !== undefined && updatePetDTO.age < 0) {
        res.status(400).json({
          success: false,
          message: 'Idade deve ser um valor positivo',
        });
        return;
      }

      const updatedPet = await this.petRepository.update(id, updatePetDTO);

      if (!updatedPet) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      const response: UpdatePetResponse = {
        success: true,
        message: 'Pet atualizado com sucesso',
        data: updatedPet,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public deletePet = async (req: DeletePetRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do pet é obrigatório',
        });
        return;
      }

      // Verifica se o pet existe
      const petExists = await this.petRepository.exists(id);
      if (!petExists) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      const deleted = await this.petRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      const response: DeletePetResponse = {
        success: true,
        message: 'Pet deletado com sucesso',
        data: {
          id,
          deletedAt: new Date(),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar pet:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
}
