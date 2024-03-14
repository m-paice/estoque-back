import { z } from 'zod';

export const rulesOrders = {
  create: (req, res, next) => {
    try {
      const parsed = z
        .object({
          accountId: z.string().uuid(),
          userId: z.string().min(3).max(255).nullable().default(null),
          user: z
            .object({
              name: z.string().default(''),
              cellPhone: z.string().default(''),
              address: z
                .object({
                  zipcode: z.string().default(''),
                  street: z.string().default(''),
                  number: z.string(),
                  complement: z.string().default(''),
                  neighborhood: z.string().default(''),
                  city: z.string().default(''),
                  state: z.string(),
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
          paymentMethod: z.enum(['card', 'cash', 'pix']).default('card'),
          status: z.enum(['awaiting', 'canceled', 'delivered', 'in_progress', 'approved']).default('awaiting'),
          addition: z.number().min(0).default(0),
          discount: z.number().min(0).default(0),
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
