"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameSearch = req.params.name || '';
            const Users = yield prisma.raw(`SELECT public."User"."id", public."User"."email", public."User"."name", 
      public."User"."avatarId", public."Avatar"."path", public."Avatar"."url"
      FROM public."User" 
      LEFT OUTER JOIN public."Avatar"
      ON public."User"."avatarId" = public."Avatar"."id" 
      WHERE public.unaccent(name) ~* public.unaccent('${nameSearch}') 
      ORDER BY public."User"."createdAt"`);
            return res.json(Users);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const { password, passwordConfirm } = newUser;
            const userCheck = yield prisma.user.findOne({
                where: {
                    email: newUser.email,
                },
            });
            if (userCheck) {
                return res.status(400).json('User exists!');
            }
            if (password !== passwordConfirm) {
                return res.status(400).json('Passwords dont match!');
            }
            newUser.password = yield bcryptjs_1.default.hash(password, 8);
            const { id, name, email, avatarId, image } = yield prisma.user.create({
                data: newUser.avatarId
                    ? {
                        name: newUser.name,
                        email: newUser.email,
                        password: newUser.password,
                        image: {
                            connect: {
                                id: newUser.avatarId,
                            },
                        },
                    }
                    : {
                        name: newUser.name,
                        email: newUser.email,
                        password: newUser.password,
                    },
                include: { image: true },
            });
            return res.json({
                id,
                name,
                email,
                avatarId,
                path: image && image.path,
                url: image && image.url,
            });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map