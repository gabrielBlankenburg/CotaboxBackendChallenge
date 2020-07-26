import { injectable } from 'inversify';
import { ProjectModel } from '../../Models/Project';
import 'reflect-metadata';

@injectable()
export default class Project {
	public format(data: ProjectModel) {
		let userParticipation = 
			data
			.userParticipation
			.map((i: any) => ({
				id: i._id,
				firstName: i.firstName,
				lastName: i.lastName,
				participation: i.participation
			}))

		return {
			id: data._id,
			name: data.name,
			userParticipation
		}
	}

	public formatArray(data: ProjectModel[]) {
		return data.map((project: ProjectModel) => {
			return this.format(project);
		});
	}
}