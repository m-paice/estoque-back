import { z } from 'zod';

export const rulesUsers = {
  create: (req, res, next) => {
    try {
      z.object({
        name: z.string().min(3).max(255),
        cellPhone: z.string().min(3).max(255),
        password: z.string().min(3).max(255),
      }).parse(req.body);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
  update: (req, res, next) => {
    try {
      z.object({
        name: z.string().min(3).max(255),
        cellPhone: z.string().min(3).max(255),
      }).parse(req.body);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
  list: (req, res, next) => {
    next();
  },
  show: (req, res, next) => {
    next();
  },
  destroy: (req, res, next) => {
    next();
  },
};
