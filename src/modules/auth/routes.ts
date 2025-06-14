import { Router } from 'express';
import { helloAuth } from './controller';

const router = Router();

router.get('/hello', helloAuth);

export default router;
