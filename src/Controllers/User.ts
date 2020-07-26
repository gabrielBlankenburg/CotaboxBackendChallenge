import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import UserService from '../Services/User';
import UserFormatter from '../Helpers/Formatters/User';
import 'reflect-metadata';

@injectable()
export default class User {
	constructor(
		@inject(UserService) private userService: UserService,
		@inject(UserFormatter) private userFormatter: UserFormatter
		) { }

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public getAll = (_:Request, res:Response, next: Function): void => {
		this.userService.getAll()
		.then((data: any) => {
			res.send(this.userFormatter.formatArray(data));
		})
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public get = (req: Request, res: Response, next: Function): void => {
		this.userService.get(req.params.id)
		.then((data: any) => {
			res.send(this.userFormatter.format(data));
		})
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public create = (req: Request, res:Response, next: Function): void => {
		this.userService.create({
			'email': req.body.email,
			'firstName': req.body.firstName,
			'lastName': req.body.lastName,
			'password': req.body.password
		})
		.then((data: any) => res.send(this.userFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public update = (req: Request, res: Response, next: Function): void => {
		this.userService.update(
			req.params.id,
			{
				'firstName': req.body.firstName,
				'lastName': req.body.lastName,
				'email': req.body.email
			}
		)
		.then((data: any) => res.send(this.userFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public delete = (req: Request, res: Response, next: Function): void => {
		this.userService.delete(req.params.id)
		.then((data: any) => res.send(this.userFormatter.format(data)))
		.catch((error: Error) => next(error));
	}
}