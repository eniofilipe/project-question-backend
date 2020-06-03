import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import QuestionController from './controllers/QuestionController';
import AvatarController from './controllers/AvatarController';

import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/', AuthController.store);
routes.post('/questions', QuestionController.store);
routes.post('/users', UserController.store);
routes.post('/avatar', upload.single('avatar'), AvatarController.store);

routes.get('/', function (req, res) {
  res.send('Pronto');
});
routes.get('/users/', UserController.index);
routes.get('/users/:name', UserController.index);
routes.get('/questions/public/:authorId', QuestionController.indexAnsewered);

routes.use(authMiddleware);
routes.get('/questions/:authorId/all', QuestionController.index);
routes.put('/questions/:authorId/:questionId', QuestionController.update);
routes.get('/questions/:authorId', QuestionController.indexNotAnsewered);

export default routes;
