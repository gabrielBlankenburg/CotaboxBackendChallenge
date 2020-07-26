import { Request, Response } from 'express';

export default Interface {
	/**
	 * @param {Error} error
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	exec(
		error: Error | null, 
		req: Request, 
		res: Response, 
		next: Function
	);
}