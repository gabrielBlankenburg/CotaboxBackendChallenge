import { injectable } from 'inversify';
import { Request, Response } from 'express';
import MiddlewareInterface from './Interface';
import CustomError from '../Errors/Parent';
import 'reflect-metadata';

@injectable()
export default class ErrorHandler implements MiddlewareInterface {
	/**
	 * @param {Request} req
	 * @param {Response} _
	 * @param {Function} next
	 * @return {void}
	 */
	public exec(
		error: CustomError | null, 
		_: Request, 
		res: Response, 
		next: Function
	) {
		if (!error) {
			next();
			return;
		}

		if (error.statusCode && error.label && error.message ) {
			res.status(error.statusCode);
			res.json({
				error: error.label,
				message: error.message
			});
			return;
		}

		res.status(500);
		res.json({
			error: 'Unknown Error',
		});
	}
}