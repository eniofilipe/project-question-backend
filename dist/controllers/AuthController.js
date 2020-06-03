"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const auth_1 = __importDefault(require("../config/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class AuthController {
    store(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = req.body;
            const userCheck = yield prisma.user.findOne({
                where: { email: userLogin.email },
                include: {
                    image: true,
                },
            });
            if (!userCheck) {
                return res.status(400).json('User not exists');
            }
            const compare = yield bcrypt.compare(userLogin.password, userCheck.password);
            if (!compare) {
                return res.status(400).json('Password dos not match');
            }
            return res.json({
                user: {
                    id: userCheck.id,
                    name: userCheck.name,
                    email: userCheck.email,
                    avatarUrl: (_a = userCheck.image) === null || _a === void 0 ? void 0 : _a.url,
                },
                token: jsonwebtoken_1.default.sign({ id: userCheck.id }, auth_1.default.secret, {
                    expiresIn: auth_1.default.expiresIn,
                }),
            });
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map