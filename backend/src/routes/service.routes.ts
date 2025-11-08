import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController';

const router = Router();
const serviceController = new ServiceController();

/**
 * @route GET /service
 * @desc Lista todos os serviços
 * @access Public
 */
router.get('/', serviceController.getAllServices);

/**
 * @route GET /service/:id
 * @desc Lista um único serviço por ID
 * @access Public
 */
router.get('/:id', serviceController.getServiceById);

/**
 * @route POST /service
 * @desc Cria um novo serviço
 * @access Public
 */
router.post('/', serviceController.createService);

/**
 * @route PUT /service/:id
 * @desc Atualiza um serviço existente
 * @access Public
 */
router.put('/:id', serviceController.updateService);

/**
 * @route DELETE /service/:id
 * @desc Deleta um serviço
 * @access Public
 */
router.delete('/:id', serviceController.deleteService);

export default router;
