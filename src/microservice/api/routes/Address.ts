import { Router } from 'express';

import { addressResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesAddress } from '../rules/address';

const controllers = {
  list: promiseHandler(() => addressResource.list()),
  show: promiseHandler((req) => addressResource.get(req.params.id)),
  create: promiseHandler((req) => addressResource.create(req.body)),
  update: promiseHandler((req) => addressResource.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => addressResource.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesAddress.create, controllers.create);
router.put('/:id', rulesAddress.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
