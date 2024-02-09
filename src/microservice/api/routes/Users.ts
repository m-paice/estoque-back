import { Router } from 'express';

import { userResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesUsers } from '../rules/users';

const controllers = {
  list: promiseHandler(() => userResource.list()),
  show: promiseHandler((req) => userResource.get(req.params.id)),
  create: promiseHandler((req) => userResource.create(req.body)),
  update: promiseHandler((req) => userResource.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => userResource.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesUsers.create, controllers.create);
router.put('/:id', rulesUsers.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
