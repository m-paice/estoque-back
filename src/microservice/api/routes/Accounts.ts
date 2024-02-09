import { Router } from 'express';

import { accountResouce } from '../../../resource';
import { promiseHandler } from '../../../utils/routing';
import { accountContext } from '../../../middleware/accountContext';
import { rulesAccounts } from '../rules/accounts';

const controllers = {
  list: promiseHandler(() => accountResouce.list()),
  show: promiseHandler((req) => accountResouce.get(req.params.id)),
  create: promiseHandler((req) => accountResouce.create(req.body)),
  update: promiseHandler((req) => accountResouce.update(req.params.id, req.body)),
  destroy: promiseHandler((req) => accountResouce.remove(req.params.id)),
};

const router = Router();

router.use(accountContext);

router.get('/', controllers.list);
router.get('/:id', controllers.show);
router.post('/', rulesAccounts.create, controllers.create);
router.put('/:id', rulesAccounts.update, controllers.update);
router.delete('/:id', controllers.destroy);

export default router;
