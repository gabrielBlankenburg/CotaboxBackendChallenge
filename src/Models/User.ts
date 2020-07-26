import mongoose, { Schema, Document } from 'mongoose';
import Entity from './Entities/UserInterface';

interface UserModel extends Document, Entity {}

const UserSchema = new Schema({
	email: {
		type: String, 
		required: true, 
		unique: true 
	},
	firstName: {
		type: String, 
		required: true
	},
	lastName: {
		type: String, 
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
});

const model = mongoose.model<UserModel>('User', UserSchema);

export { 
	model as userModel,
	UserModel 
};
