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
class QuestionController {
    indexNotAnsewered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorId = parseInt(req.params.authorId);
            const questions = yield prisma.question.findMany({
                where: {
                    reply: null,
                    author: {
                        id: authorId,
                    },
                },
            });
            return res.json(questions);
        });
    }
    indexAnsewered(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorId = parseInt(req.params.authorId);
            const questions = yield prisma.question.findMany({
                where: {
                    reply: {
                        not: null,
                    },
                    author: {
                        id: authorId,
                    },
                },
            });
            return res.json(questions);
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorId = parseInt(req.params.authorId);
            const questions = yield prisma.question.findMany({
                where: {
                    author: {
                        id: authorId,
                    },
                },
                orderBy: {
                    reply: 'desc',
                },
            });
            return res.json(questions);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = req.body;
            yield prisma.question.create({
                data: {
                    body: question.body,
                    author: {
                        connect: { id: question.authorId },
                    },
                },
            });
            return res.status(200).json('Pergunta enviada!');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = res.getHeader('userId');
            const authorId = parseInt(req.params.authorId);
            const questionId = parseInt(req.params.questionId);
            const question = yield prisma.question.findOne({
                where: { id: questionId },
            });
            if (userId !== authorId) {
                return res.status(401).json({ error: 'Not permited' });
            }
            if (!question) {
                return res.status(400).json({ error: 'Question does not exist' });
            }
            if (question.reply) {
                return res.status(401).json({ error: 'Reply exists' });
            }
            const { reply } = req.body;
            const questionUpdate = yield prisma.question.update({
                where: {
                    id: questionId,
                },
                data: { reply },
            });
            return res.status(200).json(questionUpdate);
        });
    }
}
exports.default = new QuestionController();
//# sourceMappingURL=QuestionController.js.map