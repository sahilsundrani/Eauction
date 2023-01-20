import express from 'express';
const router = express.Router();
import passport from 'passport';
import passportJWT from '../config/passport-jwt.js';
import { createUser, destroySession, returnToken } from '../controllers/users_controller.js';

router.post('/create', createUser);
router.post('/token', returnToken);
// router.post('/sign-in', createSession);
router.delete('/sign-out', destroySession);
export default router;