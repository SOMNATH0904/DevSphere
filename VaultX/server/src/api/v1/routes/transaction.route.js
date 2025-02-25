import express from 'express';

import {transactionController} from '../controllers/index.js';
import {authorization} from '../../common/middlewares/index.js';

const router = express.Router();
const {getAllTransactions} = transactionController

router
	.route('/')
	.get(authorization, getAllTransactions);

export default router;
