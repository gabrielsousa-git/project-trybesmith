import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validationUser from '../middlewares/user.validation';

const router = Router();

const userController = new UserController();

router.post(
  '/users',
  validationUser.validationUserProperties,
  validationUser.validationUserTypes,
  validationUser.validationUserLengths,
  validationUser.validationUserLevelMin,
  validationUser.validationUserValues,
  userController.create,
);

export default router;