import express from 'express';
import { authController } from '../DependencyInjection/factory';
import AuthLoginValidator from '../Middlewares/validators/Auth/Login';

const router = express.Router();

router.post(
	'/login', 
	AuthLoginValidator.rules(),
	AuthLoginValidator.handle,
	authController.login
);

export default router;