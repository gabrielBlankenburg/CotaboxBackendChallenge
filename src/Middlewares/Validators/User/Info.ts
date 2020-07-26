import { body } from 'express-validator';
import Parent from '../Parent';

export default class Info extends Parent{
	static rules() {
		return [
			body('email').isEmail(),
			body('firstName').isLength({min: 3, max: 20}),
			body('lastName').isLength({min: 3, max: 30}),
			body('password').isLength({min: 6, max: 255})
		];
	}

	static rulesWithoutPassword() {
		return [
			body('email').isEmail(),
			body('firstName').isLength({min: 3, max: 20}),
			body('lastName').isLength({min: 3, max: 30})
		];
	}
}