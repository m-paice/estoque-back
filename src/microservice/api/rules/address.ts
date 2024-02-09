import { z } from 'zod';

export const rulesAddress = {
  create: (req, res, next) => {
    try {
      z.object({
        accountId: z.string().uuid(),
        userId: z.string().uuid(),
        street: z.string().min(3).max(255),
        number: z.string().min(1).max(255),
        complement: z.string().min(3).max(255),
        neighborhood: z.string().min(3).max(255),
        city: z.string().min(3).max(255),
        state: z.string().min(2).max(2),
        country: z.string().min(3).max(255),
        zipCode: z.string().min(8).max(8),
      }).parse(req.body);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
  update: (req, res, next) => {
    try {
      z.object({
        accountId: z.string().uuid(),
        userId: z.string().uuid(),
        street: z.string().min(3).max(255),
        number: z.string().min(1).max(255),
        complement: z.string().min(3).max(255),
        neighborhood: z.string().min(3).max(255),
        city: z.string().min(3).max(255),
        state: z.string().min(2).max(2),
        country: z.string().min(3).max(255),
        zipCode: z.string().min(8).max(8),
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
