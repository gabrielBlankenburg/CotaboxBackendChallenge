import { param } from 'express-validator';
import Parent from '../Parent';

export default class ID extends Parent{
	static rules() {
		return [
			param('id').isLength({min: 24, max: 24}),
		];
	}
}