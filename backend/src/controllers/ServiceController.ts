import { Request, Response } from 'express';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { CreateServiceDTO, CreateServiceRequest, CreateServiceResponse } from '../dtos/service/CreateServiceDTO';
import { UpdateServiceDTO, UpdateServiceRequest, UpdateServiceResponse } from '../dtos/service/UpdateServiceDTO';
import { GetServiceRequest, GetServiceResponse, GetAllServicesResponse } from '../dtos/service/GetServiceDTO';
import { DeleteServiceRequest, DeleteServiceResponse } from '../dtos/service/DeleteServiceDTO';

export class ServiceController {
  private serviceRepository: ServiceRepository;

  constructor() {
    this.serviceRepository = new ServiceRepository();
  }

  public getAllServices = async (req: Request, res: Response): Promise<void> => {
    try {
      const services = await this.serviceRepository.findAll();
      const total = await this.serviceRepository.count();

      const response: GetAllServicesResponse = {
        success: true,
        message: 'Serviços listados com sucesso',
        data: services,
        total,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar serviços:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public getServiceById = async (req: GetServiceRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do serviço é obrigatório',
        });
        return;
      }

      const service = await this.serviceRepository.findById(id);

      if (!service) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      const response: GetServiceResponse = {
        success: true,
        message: 'Serviço encontrado com sucesso',
        data: service,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar serviço:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public createService = async (req: CreateServiceRequest, res: Response): Promise<void> => {
    try {
      const createServiceDTO: CreateServiceDTO = req.body;

      // Validação básica
      if (!createServiceDTO.name) {
        res.status(400).json({
          success: false,
          message: 'Nome do serviço é obrigatório',
        });
        return;
      }

      if (createServiceDTO.price === undefined || createServiceDTO.price < 0) {
        res.status(400).json({
          success: false,
          message: 'Preço deve ser informado e não pode ser negativo',
        });
        return;
      }

      const service = await this.serviceRepository.create(createServiceDTO);

      const response: CreateServiceResponse = {
        success: true,
        message: 'Serviço criado com sucesso',
        data: service,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public updateService = async (req: UpdateServiceRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateServiceDTO: UpdateServiceDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do serviço é obrigatório',
        });
        return;
      }

      // Verifica se o serviço existe
      const serviceExists = await this.serviceRepository.exists(id);
      if (!serviceExists) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      // Validação de dados de atualização
      if (updateServiceDTO.price !== undefined && updateServiceDTO.price < 0) {
        res.status(400).json({
          success: false,
          message: 'Preço não pode ser negativo',
        });
        return;
      }

      const updatedService = await this.serviceRepository.update(id, updateServiceDTO);

      if (!updatedService) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      const response: UpdateServiceResponse = {
        success: true,
        message: 'Serviço atualizado com sucesso',
        data: updatedService,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public deleteService = async (req: DeleteServiceRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do serviço é obrigatório',
        });
        return;
      }

      // Verifica se o serviço existe
      const serviceExists = await this.serviceRepository.exists(id);
      if (!serviceExists) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      const deleted = await this.serviceRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      const response: DeleteServiceResponse = {
        success: true,
        message: 'Serviço deletado com sucesso',
        data: {
          id,
          deletedAt: new Date(),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
}
