import { Router } from 'express';

import { categoriesResource } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesCategories } from '../rules/categories';

const controllers = {
  list: promiseHandler((req) => categoriesResource.list({ query: req.query.q?.toString() })),
  show: promiseHandler((req) => categoriesResource.get(req.params.id)),
  create: promiseHandler((req) => categoriesResource.create(req.body)),
  update: promiseHandler((req) => categoriesResource.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => categoriesResource.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesCategories.create, controllers.create);
router.put('/:id', rulesCategories.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
