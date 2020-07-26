import ErrorParent from './Parent';

export default class NotFound extends ErrorParent{
	constructor(message: string) {
		super(
			message, 
			'NotFound', 
			404,
			'Not Found'
		);
	}
}