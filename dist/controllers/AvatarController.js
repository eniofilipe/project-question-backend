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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AvatarController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filename: path } = req.file;
            const newAvatar = yield prisma.avatar.create({
                data: {
                    path,
                    url: `${process.env.APP_URL}/files/${path}`,
                },
            });
            const avatar = {
                id: newAvatar.id,
                path: newAvatar.path,
                url: newAvatar.url,
            };
            return res.json(avatar);
        });
    }
}
exports.default = new AvatarController();
//# sourceMappingURL=AvatarController.js.map