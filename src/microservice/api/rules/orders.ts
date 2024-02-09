import { z } from 'zod';

export const rulesOrders = {
  create: (req, res, next) => {
    try {
      z.object({
        accountId: z.string().uuid(),
        userId: z.string().min(3).max(255),
        products: z.array(
          z.object({
            id: z.string().min(3).max(255),
            amount: z.number().min(1),
          }),
        ),
      }).parse(req.body);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
  update: (req, res, next) => {
    try {
      z.object({}).parse(req.body);

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
