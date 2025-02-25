import {privateClient as apiClient} from '@services';

const WalletService = {
  getBalance: () => apiClient.get(`/wallet/balance`),

  deposit: formData => apiClient.post('/wallet/deposit', formData),

  transfer: formData => apiClient.post('/wallet/transfer', formData),
};

export default WalletService;
