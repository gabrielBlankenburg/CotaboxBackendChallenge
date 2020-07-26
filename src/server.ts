import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './Routers/user';
import authRouter from './Routers/auth';
import projectRouter from './Routers/project';
import { errorHandler, authMiddleware } from './DependencyInjection/factory';
dotenv.config();

const server = express();

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use('/v1/users', userRouter);
server.use('/v1/auth', authRouter);
server.use('/v1/projects', authMiddleware.exec, projectRouter);

server.use(errorHandler.exec);

mongoose.connect(<string>process.env.MONGOOSE_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
});

server.listen(3000, () => {
	console.log('running on port 3000');
});

export default server;