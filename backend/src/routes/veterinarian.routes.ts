import { Router } from 'express';
import { VeterinarianController } from '../controllers/VeterinarianController';

const router = Router();
const veterinarianController = new VeterinarianController();

/**
 * @route GET /veterinarian
 * @desc Lista todos os veterinários
 * @access Public
 */
router.get('/', veterinarianController.getAllVeterinarians);

/**
 * @route GET /veterinarian/:id
 * @desc Lista um único veterinário por ID
 * @access Public
 */
router.get('/:id', veterinarianController.getVeterinarianById);

/**
 * @route POST /veterinarian
 * @desc Cria um novo veterinário
 * @access Public
 */
router.post('/', veterinarianController.createVeterinarian);

/**
 * @route PUT /veterinarian/:id
 * @desc Atualiza um veterinário existente
 * @access Public
 */
router.put('/:id', veterinarianController.updateVeterinarian);

/**
 * @route DELETE /veterinarian/:id
 * @desc Deleta um veterinário
 * @access Public
 */
router.delete('/:id', veterinarianController.deleteVeterinarian);

export default router;
