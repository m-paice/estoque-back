import { Router } from 'express';

import accountsRoutes from './Accounts';
import usersRoutes from './Users';
import productsRoutes from './Products';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

routes.use('/users', usersRoutes);
routes.use('/accounts', accountsRoutes);
routes.use('/products', productsRoutes);

export default routes;
