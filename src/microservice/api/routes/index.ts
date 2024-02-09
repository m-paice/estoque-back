import { Router } from 'express';

import accountsRoutes from './Accounts';
import usersRoutes from './Users';
import productsRoutes from './Products';
import ordersRoutes from './Orders';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

routes.use('/users', usersRoutes);
routes.use('/accounts', accountsRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
