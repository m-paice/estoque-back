import { NextFunction, Request, Response } from 'express';

export function accountContext(req: Request, res: Response, next: NextFunction) {
  req.accountId = 'b028b437-dc0f-42b5-96f9-cc38d4302a7f';

  if (!req.accountId) return next();

  req.query = {
    ...req?.query,
    where: {
      // @ts-ignore
      ...req?.query?.where,
      accountId: req.accountId,
    },
  };

  req.body = {
    ...req?.body,
    accountId: req.accountId,
  };

  return next();
}
