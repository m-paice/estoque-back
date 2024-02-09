import { Router } from 'express';

import authRoutes from './Auth';
import accountsRoutes from './Accounts';
import usersRoutes from './Users';
import productsRoutes from './Products';
import ordersRoutes from './Orders';
import addressRoutes from './Address';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/accounts', accountsRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/address', addressRoutes);

export default routes;
