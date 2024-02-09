import { Router } from 'express';

import { productResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesProducts } from '../rules/products';

const controllers = {
  list: promiseHandler(() => productResource.list()),
  show: promiseHandler((req) => productResource.get(req.params.id)),
  create: promiseHandler((req) => productResource.create(req.body)),
  update: promiseHandler((req) => productResource.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => productResource.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesProducts.create, controllers.create);
router.put('/:id', rulesProducts.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
