import { Router } from 'express';

import { orderResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesOrders } from '../rules/orders';

const controllers = {
  list: promiseHandler((req) => orderResource.list({ query: req.query })),
  show: promiseHandler((req) => orderResource.get(req.params.id)),
  create: promiseHandler((req) => orderResource.create(req.body)),
  update: promiseHandler((req) => orderResource.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => orderResource.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesOrders.create, controllers.create);
router.put('/:id', rulesOrders.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
