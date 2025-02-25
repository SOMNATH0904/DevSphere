import express from 'express';

import {authController} from '../controllers/index.js';
import {authorization, passport} from '../../common/middlewares/index.js';

const router = express.Router();

const {
  registerUser,
  authenticateUser,
  unauthenticateUser,
  getAuthStatus,
  refreshAccessToken,
  handleSocialSignIn,
} = authController;

router
  .route('/signup')
  .post(registerUser);

router
  .route('/signin')
  .post(authenticateUser);

router
  .route('/signout')
  .get(authorization, unauthenticateUser);

router
  .route('/status')
  .get(getAuthStatus)

router
  .route('/refresh')
  .post(refreshAccessToken);

router
  .route('/google')
  .get(passport.authenticate('google', {scope: ['profile', 'email']}),
    (req, res) => res.send('redirecting to google...')
  );
  
router
  .route('/google/callback')
  .get(passport.authenticate('google'), handleSocialSignIn);

export default router;
