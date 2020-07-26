import express from 'express';
import { userController, authMiddleware } from '../DependencyInjection/factory';
import UserInfoValidator from '../Middlewares/validators/User/Info';
import UserIDValidator from '../Middlewares/validators/User/ID';

const router = express.Router();

router.get('/', authMiddleware.exec, userController.getAll);

router.get(
	'/:id', 
	authMiddleware.exec,
	UserIDValidator.rules(),
	UserIDValidator.handle,
	userController.get
);

router.post(
	'/', 
	UserInfoValidator.rules(), 
	UserInfoValidator.handle,
	userController.create
);

router.put(
	'/:id', 
	authMiddleware.exec,
	UserInfoValidator.rulesWithoutPassword()
		.concat(UserIDValidator.rules()), 
	UserInfoValidator.handle,
	userController.update
);

router.delete(
	'/:id',
	authMiddleware.exec,
	UserIDValidator.rules(),
	UserIDValidator.handle,
	userController.delete
);

export default router;
