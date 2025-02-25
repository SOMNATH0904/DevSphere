import {transactionService} from '../services/index.js';
import {ApiResponse, asyncHandler} from '../../common/utils/index.js';

const getAllTransactions = asyncHandler(async (req, res) => {
  const {page, limit} = req.query;

  const { transactions, pagination } = await transactionService.getTransactions(
    req.user._id,
    page,
    limit
  );

  return res.json(
    new ApiResponse(
      200,
      {transactions, pagination},
      'Transactions fetched successfully'
    )
  );
});

export const transactionController = {
  getAllTransactions,
};
