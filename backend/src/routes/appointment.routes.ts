import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';

const router = Router();
const appointmentController = new AppointmentController();

/**
 * @route GET /appointment
 * @desc Lista todos os agendamentos
 * @access Public
 */
router.get('/', appointmentController.getAllAppointments);

/**
 * @route GET /appointment/:id
 * @desc Lista um único agendamento por ID
 * @access Public
 */
router.get('/:id', appointmentController.getAppointmentById);

/**
 * @route POST /appointment
 * @desc Cria um novo agendamento
 * @access Public
 */
router.post('/', appointmentController.createAppointment);

/**
 * @route PUT /appointment/:id
 * @desc Atualiza um agendamento existente
 * @access Public
 */
router.put('/:id', appointmentController.updateAppointment);

/**
 * @route DELETE /appointment/:id
 * @desc Deleta um agendamento
 * @access Public
 */
router.delete('/:id', appointmentController.deleteAppointment);

export default router;

