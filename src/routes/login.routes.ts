import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validationLogin from '../middlewares/login.validation';

const router = Router();

const loginController = new LoginController();

router.post('/login', validationLogin, loginController.login);

export default router;