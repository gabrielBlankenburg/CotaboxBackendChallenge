import { injectable } from 'inversify';
import { Types } from 'mongoose';
import ProjectUserParticipation from '../../Models/Entities/ProjectUserParticipation';

@injectable()
export default class UserParticipationArray{
	/**
	 * @return {Types.Array<ProjectUserParticipation>}
	 */
	getNewInstance(): Types.Array<ProjectUserParticipation> {
		return new Types.Array<ProjectUserParticipation>();
	}
}