import { body } from 'express-validator';
import Parent from '../Parent';

export default class Participation extends Parent{
	/**
	 * @return {Array}
	 */
	static rules() {
		return [
			body('firstName').isLength({min: 3, max: 20}),
			body('lastName').isLength({min: 3, max: 30}),
			body('participation').isInt({min: 0, max: 100}),
		];
	}
}