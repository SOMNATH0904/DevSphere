import {ApiError, ApiResponse, asyncHandler} from '../../common/utils/index.js';
import {walletService} from '../services/index.js';
import {walletValidator} from '../validators/index.js';

const {ValidateDeposit, ValidateTransfer} = walletValidator;

const getBalance = asyncHandler(async (req, res) => {
  const wallet = await walletService.walletData(req.user._id);

  return res.json(
    new ApiResponse(
      200,
      {
        walletHolder: wallet.userId?.name,
        balance: wallet.balanceINR,
        currency: 'INR',
        gain: wallet.gainInBalance.slice(-1)[0],
      },
      'Balance fetched successfully'
    )
  );
});

const depositAmount = asyncHandler(async (req, res) => {
  const {error} = ValidateDeposit(req.body);
  if (error) throw new ApiError(400, error.issues[0].message);

  const {amount} = req.body;
  const {wallet, gainInBalance} = await walletService.deposite(
    req.user._id,
    amount
  );

  return res.json(
    new ApiResponse(
      201,
      {
        walletHolder: wallet.userId?.name,
        balance: wallet.balanceINR,
        currency: 'INR',
        gain: gainInBalance,
      },
      'Deposit is successful'
    )
  );
});

const transferAmount = asyncHandler(async (req, res, next) => {
  const {error} = ValidateTransfer(req.body);
  if (error) throw new ApiError(400, error.issues[0].message);

  const {amount, recipientId} = req.body;

  await walletService.transfer(req.user._id, recipientId, amount);

  return res.json(new ApiResponse(200, {}, 'Transaction Successful'));
});

export const walletController = {
  getBalance,
  depositAmount,
  transferAmount,
};
