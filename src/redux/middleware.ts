// middleware.ts
import { createMiddleware } from 'middleware';
import { navigationMiddleware } from '../middlewares/navigationMiddleware';

export default createMiddleware([navigationMiddleware]);