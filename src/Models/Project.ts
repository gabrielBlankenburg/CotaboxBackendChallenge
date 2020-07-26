import mongoose, { Schema, Document } from 'mongoose';
import Entity from './Entities/ProjectInterface';

interface ProjectModel extends Document, Entity {}

const userParticipation = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	participation: {
		type: Number
	}
});

const ProjectSchema = new Schema({
	name: {
		type: String, 
		required: true
	},
	userParticipation: [userParticipation]
});

const model = mongoose.model<ProjectModel>('Project', ProjectSchema);

export { 
	model as projectModel,
	ProjectModel 
};
