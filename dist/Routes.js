"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const QuestionController_1 = __importDefault(require("./controllers/QuestionController"));
const AvatarController_1 = __importDefault(require("./controllers/AvatarController"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const routes = express_1.Router();
const upload = multer_1.default(multer_2.default);
routes.post('/', AuthController_1.default.store);
routes.post('/questions', QuestionController_1.default.store);
routes.post('/users', UserController_1.default.store);
routes.post('/avatar', upload.single('avatar'), AvatarController_1.default.store);
routes.get('/', function (req, res) {
    res.send('Pronto');
});
routes.get('/users/', UserController_1.default.index);
routes.get('/users/:name', UserController_1.default.index);
routes.get('/questions/public/:authorId', QuestionController_1.default.indexAnsewered);
routes.use(auth_1.default);
routes.get('/questions/:authorId/all', QuestionController_1.default.index);
routes.put('/questions/:authorId/:questionId', QuestionController_1.default.update);
routes.get('/questions/:authorId', QuestionController_1.default.indexNotAnsewered);
exports.default = routes;
//# sourceMappingURL=Routes.js.map