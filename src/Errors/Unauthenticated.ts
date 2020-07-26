import ErrorParent from './Parent';

export default class Unauthenticated extends ErrorParent{
	constructor(message: string) {
		super(
			message, 
			'Unauthenticated', 
			401, 
			'Unauthenticated'
		);
	}
}