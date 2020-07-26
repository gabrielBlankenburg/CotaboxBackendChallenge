import { Container } from "inversify";
import "reflect-metadata";
import UserController from '../Controllers/User';
import AuthController from '../Controllers/Auth';
import ProjectController from '../Controllers/Project';
import UserService from '../Services/User';
import Hash from '../Helpers/Hash';
import AuthService from '../Services/Auth';
import ProjectService from '../Services/Project';
import { UserModel, userModel } from '../Models/User';
import { ProjectModel, projectModel } from '../Models/Project';
import { Model } from 'mongoose';
import ErrorHandler from '../Middlewares/ErrorHandler';
import AuthMiddleware from '../Middlewares/Auth';
import UserFormatter from '../Helpers/Formatters/User';
import ProjectFormatter from '../Helpers/Formatters/Project';
import UserParticipationArray from '../Helpers/Entities/UserParticipationArray';

let container = new Container();
container.bind<Model<UserModel>>(userModel).toConstantValue(userModel);
container.bind<Model<ProjectModel>>(projectModel).toConstantValue(projectModel);
container.bind<Hash>(Hash).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<ProjectService>(ProjectService).toSelf();
container.bind<UserFormatter>(UserFormatter).toSelf();
container.bind<ProjectFormatter>(ProjectFormatter).toSelf();
container.bind<UserParticipationArray>(UserParticipationArray).toSelf();

const userController = container.resolve<UserController>(UserController);
const authController = container.resolve<AuthController>(AuthController);
const errorHandler = container.resolve<ErrorHandler>(ErrorHandler);
const authMiddleware = container.resolve<AuthMiddleware>(AuthMiddleware);
const projectController = container.resolve<ProjectController>(ProjectController);

export { 
	userController, 
	errorHandler, 
	authController, 
	authMiddleware,
	projectController
};

export default container;
