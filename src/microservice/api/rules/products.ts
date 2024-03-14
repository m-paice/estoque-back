import { z } from 'zod';

export const rulesProducts = {
  create: (req, res, next) => {
    try {
      const parsed = z
        .object({
          accountId: z.string().uuid(),
          name: z.string().min(3).max(255),
          description: z.string().nullable().default(null),
          categories: z.array(z.string().uuid()).nullable().default(null),
          variants: z.array(
            z.object({
              price: z.number().default(0),
              amount: z.number().default(0),
              color: z.string().default(''),
              size: z.string().default(''),
            }),
          ),
        })
        .parse(req.body);

      req.body = parsed;

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
  update: (req, res, next) => {
    try {
      const parsed = z
        .object({
          name: z.string().min(3).max(255),
          description: z.string().nullable().default(null),
          price: z.number().min(0),
          amount: z.number().min(0),
          categoryId: z.string().uuid().nullable().default(null),
        })
        .parse(req.body);

      req.body = parsed;

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
