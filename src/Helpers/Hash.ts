import crypto from 'crypto';
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class Hash {
	
	/**
	 * @param {String} password
	 * @param {String} salt
	 * @return {String}
	 */
	checkSalt = (password: string, salt: string) => {
		return this.sha512(password, salt);
	}

	/**
	 * @param {String} password
	 * @return {Object}
	 */
	hashAndSalt = (password: string) => {
		let salt = this.generateSalt(32);
		let hash = this.sha512(password, salt);

		return {
			hash: hash,
			salt: salt
		}
	}

	/**
	 * @param {Number} length
	 * @return {String}
	 */
	private generateSalt(length: number = 32) {
	    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);
	}

	/**
	 * @param {String} password
	 * @param {String} salt
	 * @return {String}
	 */
	private sha512(password:string, salt:string) {
	    var hash = crypto.createHmac('sha512', salt);
	    hash.update(password);
	    return hash.digest('hex');
	}
}