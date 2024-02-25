import { z } from 'zod';

export const rulesOrders = {
  create: (req, res, next) => {
    try {
      z.object({
        accountId: z.string().uuid(),
        userId: z.string().min(3).max(255).nullable().default(null),
        user: z
          .object({
            name: z.string().min(3).max(255),
            cellPhone: z.string().min(3).max(255),
            address: z
              .object({
                zipcode: z.string().min(3).max(255),
                street: z.string().min(3).max(255),
                number: z.string().min(3).max(255),
                complement: z.string().min(3).max(255),
                neighborhood: z.string().min(3).max(255),
                city: z.string().min(3).max(255),
                state: z.string().min(3).max(255),
              })
              .nullable()
              .default(null),
          })
          .nullable()
          .default(null),
        products: z.array(
          z.object({
            id: z.string().min(3).max(255),
            amount: z.number().min(1),
          }),
        ),
        paymentMethod: z.enum(['card', 'cash', 'pix']),
        addition: z.number().min(0).default(0),
        discount: z.number().min(0).default(0),
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
