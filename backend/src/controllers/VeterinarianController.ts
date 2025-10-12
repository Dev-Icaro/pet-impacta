import { Request, Response } from 'express';
import { VeterinarianRepository } from '../repositories/VeterinarianRepository';
import {
  CreateVeterinarianDTO,
  CreateVeterinarianRequest,
  CreateVeterinarianResponse,
} from '../dtos/veterinarian/CreateVeterinarianDTO';
import {
  UpdateVeterinarianDTO,
  UpdateVeterinarianRequest,
  UpdateVeterinarianResponse,
} from '../dtos/veterinarian/UpdateVeterinarianDTO';
import {
  GetVeterinarianRequest,
  GetVeterinarianResponse,
  GetAllVeterinariansResponse,
} from '../dtos/veterinarian/GetVeterinarianDTO';
import { DeleteVeterinarianRequest, DeleteVeterinarianResponse } from '../dtos/veterinarian/DeleteVeterinarianDTO';

export class VeterinarianController {
  private veterinarianRepository: VeterinarianRepository;

  constructor() {
    this.veterinarianRepository = new VeterinarianRepository();
  }

  public getAllVeterinarians = async (req: Request, res: Response): Promise<void> => {
    try {
      const veterinarians = await this.veterinarianRepository.findAll();
      const total = await this.veterinarianRepository.count();

      const response: GetAllVeterinariansResponse = {
        success: true,
        message: 'Veterinários listados com sucesso',
        data: veterinarians,
        total,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar veterinários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public getVeterinarianById = async (req: GetVeterinarianRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do veterinário é obrigatório',
        });
        return;
      }

      const veterinarian = await this.veterinarianRepository.findById(id);

      if (!veterinarian) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      const response: GetVeterinarianResponse = {
        success: true,
        message: 'Veterinário encontrado com sucesso',
        data: veterinarian,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar veterinário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public createVeterinarian = async (req: CreateVeterinarianRequest, res: Response): Promise<void> => {
    try {
      const createVeterinarianDTO: CreateVeterinarianDTO = req.body;

      // Validação básica
      if (!createVeterinarianDTO.name || !createVeterinarianDTO.licenseNumber) {
        res.status(400).json({
          success: false,
          message: 'Nome e número da licença são obrigatórios',
        });
        return;
      }

      // Validação de email se fornecido
      if (createVeterinarianDTO.email && !this.isValidEmail(createVeterinarianDTO.email)) {
        res.status(400).json({
          success: false,
          message: 'Email inválido',
        });
        return;
      }

      const veterinarian = await this.veterinarianRepository.create(createVeterinarianDTO);

      const response: CreateVeterinarianResponse = {
        success: true,
        message: 'Veterinário criado com sucesso',
        data: veterinarian,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar veterinário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public updateVeterinarian = async (req: UpdateVeterinarianRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateVeterinarianDTO: UpdateVeterinarianDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do veterinário é obrigatório',
        });
        return;
      }

      // Verifica se o veterinário existe
      const veterinarianExists = await this.veterinarianRepository.exists(id);
      if (!veterinarianExists) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      // Validação de email se fornecido
      if (updateVeterinarianDTO.email && !this.isValidEmail(updateVeterinarianDTO.email)) {
        res.status(400).json({
          success: false,
          message: 'Email inválido',
        });
        return;
      }

      const updatedVeterinarian = await this.veterinarianRepository.update(id, updateVeterinarianDTO);

      if (!updatedVeterinarian) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      const response: UpdateVeterinarianResponse = {
        success: true,
        message: 'Veterinário atualizado com sucesso',
        data: updatedVeterinarian,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar veterinário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public deleteVeterinarian = async (req: DeleteVeterinarianRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do veterinário é obrigatório',
        });
        return;
      }

      // Verifica se o veterinário existe
      const veterinarianExists = await this.veterinarianRepository.exists(id);
      if (!veterinarianExists) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      const deleted = await this.veterinarianRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      const response: DeleteVeterinarianResponse = {
        success: true,
        message: 'Veterinário deletado com sucesso',
        data: {
          id,
          deletedAt: new Date(),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar veterinário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
