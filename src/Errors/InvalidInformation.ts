import ErrorParent from './Parent';

export default class InvalidInformation extends ErrorParent{
	constructor(message: string) {
		super(
			message, 
			'InvalidInformation', 
			400, 
			'Invalid Information'
		);
	}
}