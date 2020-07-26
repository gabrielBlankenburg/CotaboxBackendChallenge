import { injectable } from 'inversify';
import { Response } from 'express';
import MiddlewareInterface from './Interface';
import jwt, { Secret, JsonWebTokenError } from 'jsonwebtoken';
import 'reflect-metadata';

@injectable()
export default class Auth implements MiddlewareInterface {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public exec(
		req: any, 
		res: Response, 
		next: Function
	) {
		let token = req.headers['x-access-token'];

		if (!token) {
			res.status(400);
			res.json({
				error: 'Missing authentication token',
				message: 'No token provided.'
			});
			return;
		}

		jwt.verify(
			<string>token,
			<Secret>process.env.JWT_SECRET, 
			{},
			(error: JsonWebTokenError | null, decoded: any) => {
				if (error) {
					res.status(401);
					res.json({
						error: 'Invalid Token.'
					});
					return;
				}

				req.userId = decoded.id;
				next();
			}
		)
	}
}