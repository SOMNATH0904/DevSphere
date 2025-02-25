import express from 'express';

import {walletController} from '../controllers/index.js';
import {authorization} from '../../common/middlewares/index.js';

const router = express.Router();

const {getBalance, depositAmount, transferAmount} = walletController;

router
  .route('/balance')
  .get(authorization, getBalance);

router
  .route('/deposit')
  .post(authorization, depositAmount);

router
  .route('/transfer')
  .post(authorization, transferAmount);

export default router;
