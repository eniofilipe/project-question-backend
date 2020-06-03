import { PrismaClient, QuestionCreateInput } from '@prisma/client';
import { Request, Response } from 'express';
import { stringify } from 'querystring';

const prisma = new PrismaClient();

interface CustomQuestion extends QuestionCreateInput {
  authorId: number;
}
class QuestionController {
  async indexNotAnsewered(req: Request, res: Response): Promise<Response> {
    const authorId = parseInt(req.params.authorId);

    const questions = await prisma.question.findMany({
      where: {
        reply: null,
        author: {
          id: authorId,
        },
      },
    });

    return res.json(questions);
  }

  async indexAnsewered(req: Request, res: Response): Promise<Response> {
    const authorId = parseInt(req.params.authorId);

    const questions = await prisma.question.findMany({
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
  }
  async index(req: Request, res: Response): Promise<Response> {
    const authorId = parseInt(req.params.authorId);

    const questions = await prisma.question.findMany({
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
  }

  async store(req: Request, res: Response): Promise<Response> {
    const question: CustomQuestion = req.body;

    await prisma.question.create({
      data: {
        body: question.body,
        author: {
          connect: { id: question.authorId },
        },
      },
    });

    return res.status(200).json('Pergunta enviada!');
  }

  async update(req: Request, res: Response): Promise<Response> {
    const userId = res.getHeader('userId');

    const authorId = parseInt(req.params.authorId);
    const questionId = parseInt(req.params.questionId);

    const question = await prisma.question.findOne({
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

    const questionUpdate = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: { reply },
    });

    return res.status(200).json(questionUpdate);
  }
}

export default new QuestionController();
