export default class Parent extends Error{
	public statusCode: number;
	public label: string;

	constructor(
		message: string, 
		name: string, 
		statusCode: number, 
		label: string
	) {
		super(message);
		this.statusCode = statusCode;
		this.label = label;
		this.name = name;
	}
}