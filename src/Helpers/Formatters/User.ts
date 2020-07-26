import { injectable } from 'inversify';
import { UserModel } from '../../Models/User';
import 'reflect-metadata';

@injectable()
export default class User {
	public format(data: UserModel) {
		return {
			id: data._id,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName
		}
	}

	public formatArray(data: UserModel[]) {
		return data.map((user: UserModel) => {
			return this.format(user);
		});
	}
}