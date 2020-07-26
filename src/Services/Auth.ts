import { injectable, inject } from 'inversify';
import { UserModel, userModel } from '../Models/User';
import { Model } from 'mongoose';
import Hash from '../Helpers/Hash'
import UnauthenticatedError from '../Errors/Unauthenticated';
import jwt, { Secret } from 'jsonwebtoken'
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
	 * @return {String}
	 */
	private createToken(id: string) {
		let token = jwt.sign({ id }, <Secret>process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24
		});

		return token;
	}

	/**
	 * @param {String} email
	 * @param {String} password
	 * @return {Object}
	 */
	public async login(email: string, password: string) {
		const user = await this.userModel.findOne({email: email});

		if (!user) {
			throw new UnauthenticatedError('Email and password don\`t match');
		}
		
		let hash = this.hash.checkSalt(password, user.salt);

		if (hash != user.hash) {
			throw new UnauthenticatedError('Email and password don\'t match');
		}

		let token = this.createToken(user._id);

		return {
			token,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		}
	}
}

