import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import ProjectService from '../Services/Project';
import ProjectFormatter from '../Helpers/Formatters/Project';
import 'reflect-metadata';

@injectable()
export default class Project {
	constructor(
		@inject(ProjectService) private projectService: ProjectService,
		@inject(ProjectFormatter) private projectFormatter: ProjectFormatter
		) { }

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public getAll = (_:Request, res: Response, next: Function): void => {
		this.projectService.getAll()
		.then((data: any) => {
			res.send(this.projectFormatter.formatArray(data));
		})
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public get = (req: Request, res: Response, next: Function): void => {
		this.projectService.get(req.params.id)
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public create = (req: Request, res: Response, next: Function): void => {
		this.projectService.create({
			'name': req.body.name
		})
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public update = (req: Request, res: Response, next: Function): void => {
		let data = {name: req.body.name};

		this.projectService.update(req.params.id, data)
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public addParticipation = (req: Request, res: Response, next: Function): void => {
		let data = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			participation: req.body.participation
		};

		this.projectService.addParticipation(req.params.id, data)
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public updateParticipation = (req: Request, res: Response, next: Function): void => {
		let data = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			participation: req.body.participation
		};

		this.projectService.updateParticipation(
			req.params.id, 
			req.params.participationId,
			data
		)
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public delete = (req: Request, res: Response, next: Function): void => {
		this.projectService.delete(req.params.id)
		.then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Function} next
	 * @return {void}
	 */
	public deleteParticipation = (req: Request, res: Response, next: Function): void => {
		this.projectService.deleteParticipation(
			req.params.id, 
			req.params.participationId
		).then((data: any) => res.send(this.projectFormatter.format(data)))
		.catch((error: Error) => next(error));
	}
}