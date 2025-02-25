import express from 'express';

import {userController} from '../controllers/index.js';
import {authorization} from '../../common/middlewares/index.js';

const {getAllUsers, getCurrentUser, updateCurrentUser} = userController;

const router = express.Router();

router
  .route('/')
  .get(authorization, getAllUsers);

router
  .route('/me')
  .get(authorization, getCurrentUser)
  .patch(authorization, updateCurrentUser);

export default router;
