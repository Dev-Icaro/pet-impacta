import { Router } from 'express';
import { PetController } from '../controllers/PetController';

const router = Router();
const petController = new PetController();

/**
 * @route GET /pet
 * @desc Lista todos os pets
 * @access Public
 */
router.get('/', petController.getAllPets);

/**
 * @route GET /pet/:id
 * @desc Lista um único pet por ID
 * @access Public
 */
router.get('/:id', petController.getPetById);

/**
 * @route POST /pet
 * @desc Cria um novo pet
 * @access Public
 */
router.post('/', petController.createPet);

/**
 * @route PUT /pet/:id
 * @desc Atualiza um pet existente
 * @access Public
 */
router.put('/:id', petController.updatePet);

/**
 * @route DELETE /pet/:id
 * @desc Deleta um pet
 * @access Public
 */
router.delete('/:id', petController.deletePet);

export default router;
