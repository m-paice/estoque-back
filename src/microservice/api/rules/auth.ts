import { z } from 'zod';

export const rulesAuth = {
  login: (req, res, next) => {
    try {
      z.object({
        cellPhone: z.string().min(11).max(11),
        password: z.string().min(4).max(255),
      }).parse(req.body);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as z.ZodError).errors });
    }
  },
};
