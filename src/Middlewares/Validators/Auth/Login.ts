import { body } from 'express-validator';
import Parent from '../Parent';

export default class Login extends Parent{
	/**
	 * @return {Array}
	 */
	static rules() {
		return [
			body('email').isEmail(),
			body('password').isLength({min: 6})
		];
	}
}