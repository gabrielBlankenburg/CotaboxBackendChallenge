import { param } from 'express-validator';
import Parent from '../Parent';

export default class ParticipationID extends Parent{
	/**
	 * @return {Array}
	 */
	static rules() {
		return [
			param('participationId').isLength({min: 24, max: 24}),
		];
	}
}