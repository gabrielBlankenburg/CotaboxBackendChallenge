import { body } from 'express-validator';
import Parent from '../Parent';

export default class Info extends Parent{
	/**
	 * @return {Array}
	 */
	static rules() {
		return [
			body('name').isLength({min: 4}),
		];
	}
}