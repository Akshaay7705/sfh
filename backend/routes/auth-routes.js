import express from 'express';
import { signin, signup } from '../controllers/auth-controllers.js';

export const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);