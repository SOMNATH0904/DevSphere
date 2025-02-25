import {Transaction} from '../../common/models/index.js';
import {paginateQuery} from '../../common/utils/index.js';

const getAllTransactions = async (userId, page , limit) => {
  const transactionsQuery = Transaction
    .find({$or: [{senderId: userId}, {recipientId: userId}]})
    .populate('senderId', 'name')
    .populate('recipientId', 'name')
    .select('-__v')
    .sort({ createdAt: -1 });
  
  const result = await paginateQuery(transactionsQuery, page, limit);

  const transactionList = result.data.map(transaction => {
    const utcDate = new Date(transaction.createdAt);

    return {
      sender: transaction.senderId?.name || 'ADMIN',
      recipient: transaction.recipientId?.name,
      amount: transaction.amountINR,
      date: utcDate.toLocaleDateString('en-GB'),
      time: utcDate.toLocaleTimeString('en-US', {timeZone: 'Asia/Kolkata'}),
    };
  });

  return {transactions: transactionList, pagination: result.pagination};
};

export const transactionService = {
  getTransactions: getAllTransactions,
};
