import { Router } from 'express';

import { authResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { rulesAuth } from '../rules/auth';

const controllers = {
  auth: promiseHandler((req) => authResource.login(req.body)),
};

const router = Router();

router.post('/login', rulesAuth.login, controllers.auth);

export default router;
