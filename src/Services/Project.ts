import { injectable, inject } from 'inversify';
import { ProjectModel, projectModel } from '../Models/Project';
import ProjectEntity from '../Models/Entities/ProjectInterface';
import ProjectUserParticipation from '../Models/Entities/ProjectUserParticipation';
import NotFoundError from '../Errors/NotFound';
import InvalidInformationError from '../Errors/InvalidInformation';
import UserParticipationArray from '../Helpers/Entities/UserParticipationArray';
import { Model } from 'mongoose';
import 'reflect-metadata';

@injectable()
export default class Project {
	constructor(
		@inject(projectModel) private projectModel: Model<ProjectModel>,
		@inject(UserParticipationArray) private userParticipationArray: UserParticipationArray
		)
	{ }

	/**
	 * @param {ProjectUserParticipation[]} participations
	 * @return {void}
	 */
	private validateParticipationCount(
		participations: ProjectUserParticipation[]
		) 
	{
		let count = 
			participations
			.map((i: ProjectUserParticipation) => i.participation)
			.reduce((sum: number, i: number) => sum + i);

		if (count > 100) {
			throw new InvalidInformationError(
				'Participation sum cannot be higher than 100.'
			);
		}
	}

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	private async findProjectById(id: string) {
		let project = await this.projectModel.findById(id);

		if (!project) {
			throw new NotFoundError('Project Not Found');
		}

		return project;
	}

	/**
	 * @return {Promise}
	 */
	public async getAll(): Promise<ProjectEntity[]> {
		return this.projectModel.find({});
	}

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	public async get(id: string): Promise<ProjectEntity> {
		return this.findProjectById(id);
	}

	/**
	 * @param {Object} body
	 * @return {Promise}
	 */
	public async create(body: any): Promise<ProjectEntity> {
		const data: ProjectEntity = await this.projectModel.create({
			name: body.name,
			userParticipation: this.userParticipationArray.getNewInstance()
		});

		return data;
	}

	/**
	 * @param {String} id
	 * @param {Object} body
	 * @return {Promise}
	 */
	public async update (id: string, body: any) {
		let project = await this.projectModel.findByIdAndUpdate(
			id, 
			{name: body.name},
			{new: true}
		);

		if (!project) {
			throw new NotFoundError('Project Not Found');
		}

		return project;
	}

	/**
	 * @param {String} id
	 * @return {Promise}
	 */
	public async delete (id: any) {
		let project = await this.projectModel.findByIdAndRemove(id);

		if (!project) {
			throw new NotFoundError('Project Not Found');
		}

		return project;
	}

	/**
	 * @param {String} id
	 * @param {ProjectUserParticipation} data
	 * @return {Promise}
	 */
	public async addParticipation(
		id: string, 
		data: ProjectUserParticipation
		) {

		let project = await this.findProjectById(id);

		if (!project.userParticipation) {
			project.userParticipation = 
				this.userParticipationArray.getNewInstance();
		}

		project.userParticipation.push(data);
		
		if (project.userParticipation.length > 0) {
			this.validateParticipationCount(project.userParticipation);
		}

 		await project.save();

		return project;

	}

	/**
	 * @param {String} projectId
	 * @param {String} userParticipationId
	 * @param {ProjectUserParticipation} data
	 * @return {Promise}
	 */
	public async updateParticipation(
		projectId: string,
		userParticipationId: string,
		data: ProjectUserParticipation
		) {
		let project = await this.findProjectById(projectId);

		let newParticipation = this.userParticipationArray.getNewInstance();
		project.userParticipation.forEach((i: any) => {
			if (i._id == userParticipationId) {
				newParticipation.push(data);
				return;
			}

			newParticipation.push(i);
		});

		this.validateParticipationCount(newParticipation);

		project.userParticipation = newParticipation;

		await project.save();

		return project;
	}

	/**
	 * @param {String} projectId
	 * @param {String} participationId
	 * @return {Promise}
	 */
	public async deleteParticipation(
		projectId: string, 
		participationId: string
		) 
	{
		let project = await this.findProjectById(projectId);

		project.userParticipation.pull({_id:participationId});

		await project.save();

		return project;
	}
}
