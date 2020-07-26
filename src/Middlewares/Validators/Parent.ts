import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

export default class Parent {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {Functon | Response}
	 */
	static handle = (req: Request, res: Response, next: Function) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		return next();
	}
}