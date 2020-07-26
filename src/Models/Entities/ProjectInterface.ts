import ProjectUserParticipation from './ProjectUserParticipation';
import { Types } from 'mongoose';

export default interface Project {
	name: string;
	userParticipation: Types.Array<ProjectUserParticipation>;
}