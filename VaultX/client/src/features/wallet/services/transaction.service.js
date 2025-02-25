import {privateClient as apiClient} from '@services';

const TransactionService = {
  getAllTransactions: page =>
    apiClient.get(`/transactions?page=${page}&limit=5`),
};

export default TransactionService;
