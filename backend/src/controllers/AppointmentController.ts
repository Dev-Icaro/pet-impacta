import { Request, Response } from 'express';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { CreateAppointmentDTO, CreateAppointmentRequest, CreateAppointmentResponse } from '../dtos/appointment/CreateAppointmentDTO';
import { UpdateAppointmentDTO, UpdateAppointmentRequest, UpdateAppointmentResponse } from '../dtos/appointment/UpdateAppointmentDTO';
import { GetAppointmentRequest, GetAppointmentResponse, GetAllAppointmentsResponse } from '../dtos/appointment/GetAppointmentDTO';
import { DeleteAppointmentRequest, DeleteAppointmentResponse } from '../dtos/appointment/DeleteAppointmentDTO';

export class AppointmentController {
  private appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = new AppointmentRepository();
  }

  public getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
      const appointments = await this.appointmentRepository.findAll();
      const total = await this.appointmentRepository.count();

      const response: GetAllAppointmentsResponse = {
        success: true,
        message: 'Agendamentos listados com sucesso',
        data: appointments,
        total,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public getAppointmentById = async (req: GetAppointmentRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento é obrigatório',
        });
        return;
      }

      const appointment = await this.appointmentRepository.findById(id);

      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado',
        });
        return;
      }

      const response: GetAppointmentResponse = {
        success: true,
        message: 'Agendamento encontrado com sucesso',
        data: appointment,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public createAppointment = async (req: CreateAppointmentRequest, res: Response): Promise<void> => {
    try {
      const createAppointmentDTO: CreateAppointmentDTO = req.body;

      // Validação básica de campos obrigatórios
      if (!createAppointmentDTO.petId) {
        res.status(400).json({
          success: false,
          message: 'ID do pet é obrigatório',
        });
        return;
      }

      if (!createAppointmentDTO.serviceId) {
        res.status(400).json({
          success: false,
          message: 'ID do serviço é obrigatório',
        });
        return;
      }

      if (!createAppointmentDTO.veterinarianId) {
        res.status(400).json({
          success: false,
          message: 'ID do veterinário é obrigatório',
        });
        return;
      }

      if (!createAppointmentDTO.appointmentDate) {
        res.status(400).json({
          success: false,
          message: 'Data do agendamento é obrigatória',
        });
        return;
      }

      // Validar se a data é válida e futura
      const appointmentDate = new Date(createAppointmentDTO.appointmentDate);
      if (isNaN(appointmentDate.getTime())) {
        res.status(400).json({
          success: false,
          message: 'Data do agendamento inválida',
        });
        return;
      }

      const now = new Date();
      if (appointmentDate < now) {
        res.status(400).json({
          success: false,
          message: 'A data do agendamento deve ser futura',
        });
        return;
      }

      // Verificar se os IDs relacionados existem
      const petExists = await this.appointmentRepository.petExists(createAppointmentDTO.petId);
      if (!petExists) {
        res.status(404).json({
          success: false,
          message: 'Pet não encontrado',
        });
        return;
      }

      const serviceExists = await this.appointmentRepository.serviceExists(createAppointmentDTO.serviceId);
      if (!serviceExists) {
        res.status(404).json({
          success: false,
          message: 'Serviço não encontrado',
        });
        return;
      }

      const veterinarianExists = await this.appointmentRepository.veterinarianExists(createAppointmentDTO.veterinarianId);
      if (!veterinarianExists) {
        res.status(404).json({
          success: false,
          message: 'Veterinário não encontrado',
        });
        return;
      }

      const appointment = await this.appointmentRepository.create(createAppointmentDTO);

      const response: CreateAppointmentResponse = {
        success: true,
        message: 'Agendamento criado com sucesso',
        data: appointment,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public updateAppointment = async (req: UpdateAppointmentRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateAppointmentDTO: UpdateAppointmentDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento é obrigatório',
        });
        return;
      }

      // Verifica se o agendamento existe
      const appointmentExists = await this.appointmentRepository.exists(id);
      if (!appointmentExists) {
        res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado',
        });
        return;
      }

      // Validar data se foi fornecida
      if (updateAppointmentDTO.appointmentDate) {
        const appointmentDate = new Date(updateAppointmentDTO.appointmentDate);
        if (isNaN(appointmentDate.getTime())) {
          res.status(400).json({
            success: false,
            message: 'Data do agendamento inválida',
          });
          return;
        }

        const now = new Date();
        if (appointmentDate < now) {
          res.status(400).json({
            success: false,
            message: 'A data do agendamento deve ser futura',
          });
          return;
        }
      }

      // Verificar se os IDs relacionados existem (se foram fornecidos)
      if (updateAppointmentDTO.petId) {
        const petExists = await this.appointmentRepository.petExists(updateAppointmentDTO.petId);
        if (!petExists) {
          res.status(404).json({
            success: false,
            message: 'Pet não encontrado',
          });
          return;
        }
      }

      if (updateAppointmentDTO.serviceId) {
        const serviceExists = await this.appointmentRepository.serviceExists(updateAppointmentDTO.serviceId);
        if (!serviceExists) {
          res.status(404).json({
            success: false,
            message: 'Serviço não encontrado',
          });
          return;
        }
      }

      if (updateAppointmentDTO.veterinarianId) {
        const veterinarianExists = await this.appointmentRepository.veterinarianExists(updateAppointmentDTO.veterinarianId);
        if (!veterinarianExists) {
          res.status(404).json({
            success: false,
            message: 'Veterinário não encontrado',
          });
          return;
        }
      }

      const updatedAppointment = await this.appointmentRepository.update(id, updateAppointmentDTO);

      if (!updatedAppointment) {
        res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado',
        });
        return;
      }

      const response: UpdateAppointmentResponse = {
        success: true,
        message: 'Agendamento atualizado com sucesso',
        data: updatedAppointment,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };

  public deleteAppointment = async (req: DeleteAppointmentRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID do agendamento é obrigatório',
        });
        return;
      }

      // Verifica se o agendamento existe
      const appointmentExists = await this.appointmentRepository.exists(id);
      if (!appointmentExists) {
        res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado',
        });
        return;
      }

      const deleted = await this.appointmentRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Agendamento não encontrado',
        });
        return;
      }

      const response: DeleteAppointmentResponse = {
        success: true,
        message: 'Agendamento deletado com sucesso',
        data: {
          id,
          deletedAt: new Date(),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
}

