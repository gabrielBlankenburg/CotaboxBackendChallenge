import { Request, Response } from 'express';
import { injectable, inject } from "inversify";
import AuthService from '../Services/Auth'
import "reflect-metadata";

@injectable()
export default class Auth {
	constructor(@inject(AuthService) private authService: AuthService) { }

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public login = (req: Request, res:Response, next: Function): void => {
		this.authService.login(
			req.body.email,
			req.body.password
		)
		.then((data: any) => res.send(data))
		.catch((error: Error) => next(error));
	}
}