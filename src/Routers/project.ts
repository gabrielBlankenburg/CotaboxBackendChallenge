import express from 'express';
import { projectController } from '../DependencyInjection/factory';
import ProjectInfoValidator from '../Middlewares/validators/Project/Info';
import ProjectIDValidator from '../Middlewares/validators/Project/ID';
import ProjectParticipationIDValidator from '../Middlewares/validators/Project/ParticipationID';
import ProjectParticipationValidator from '../Middlewares/validators/Project/Participation';
const router = express.Router();

router.get('/', projectController.getAll);

router.get(
	'/:id', 
	ProjectIDValidator.rules(),
	ProjectIDValidator.handle,
	projectController.get
);

router.post(
	'/', 
	ProjectInfoValidator.rules(),
	ProjectInfoValidator.handle,
	projectController.create
);

router.post(
	'/:id/participation', 
	ProjectParticipationValidator
		.rules()
		.concat(ProjectIDValidator.rules()),
	ProjectParticipationValidator.handle,
	projectController.addParticipation
);

router.put(
	'/:id/participation/:participationId',
	ProjectParticipationValidator
		.rules()
		.concat(ProjectIDValidator.rules())
		.concat(ProjectParticipationIDValidator.rules()),
	ProjectParticipationValidator.handle,
	projectController.updateParticipation
);

router.put(
	'/:id', 
	ProjectIDValidator.rules().concat(ProjectInfoValidator.rules()),
	ProjectIDValidator.handle,
	projectController.update
);

router.delete(
	'/:id', 
	ProjectIDValidator.rules(),
	ProjectIDValidator.handle,
	projectController.delete
);

router.delete(
	'/:id/participation/:participationId',
	ProjectIDValidator.rules()
		.concat(ProjectParticipationIDValidator.rules()),
	ProjectIDValidator.handle,
	projectController.deleteParticipation
);

export default router;