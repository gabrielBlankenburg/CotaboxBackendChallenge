import { injectable, inject } from 'inversify';
import { UserModel, userModel } from '../Models/User';
import UserEntity from '../Models/Entities/UserInterface';
import { Model } from 'mongoose';
import Hash from '../Helpers/Hash'
import InvalidInformationError from '../Errors/InvalidInformation';
import NotFoundError from '../Errors/NotFound';
import 'reflect-metadata';

@injectable()
export default class User {
	constructor(
		@inject(userModel) private userModel: Model<UserModel>,
		@inject(Hash) private hash: Hash
		) 
	{ }

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	private async findById(id: string) {
		let user = await this.userModel.findById(id);

		if (!user) {
			throw new NotFoundError('User Not Found.');
		}

		return user
	}

	/**
	 * @param {String} email
	 * @return {Boolean}
	 */
	private async existingEmail(email: string) {
		const existingUser = await this.userModel.find({email});

		if (existingUser.length > 0) {
			throw new InvalidInformationError('This email is already registered at the platform.');
		}

		return true;
	}

	/**
	 * @return {Promise}
	 */
	public async getAll(): Promise<UserEntity[]> {
		return this.userModel.find({});
	}

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	public async get(id: string): Promise<UserEntity> {
		return this.findById(id);
	}

	/**
	 * @param {String} id
	 * @param {Object} body
	 * @return {Promise}
	 */
	public async update(id: string, body: any): Promise<UserEntity> {
		let user = await this.findById(id);

		if (user.email != body.email) {
			await this.existingEmail(body.email);
		}

		user.firstName = body.firstName;
		user.lastName = body.lastName;
		user.email = body.email;

		await user.save();

		return user;
	}

	/**
	 * @param {Object} body
	 * @return {Promise}
	 */
	public async create(body: any): Promise<UserEntity> {
		await this.existingEmail(body.email);

		let { hash, salt } = this.hash.hashAndSalt(body.password);

		const data: UserEntity = await this.userModel.create({
			email: body.email,
			firstName: body.firstName,
			lastName: body.lastName,
			hash,
			salt
		});

		return data;
	}

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	public async delete(id: string): Promise<UserEntity> {
		let user = await this.userModel.findByIdAndRemove(id);

		if (!user) {
			throw new NotFoundError('User Not Found');
		}

		return user;
	}
}

