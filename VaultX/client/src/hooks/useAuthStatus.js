import {useQuery} from '@tanstack/react-query';

import {AuthService} from '@features/authentication';

const useAuthStatus = () => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const response = await AuthService.checkAuthStatus();
      console.log(response.data.data.authenticated);
      return response.data.data.authenticated;
    },
  });
};

export default useAuthStatus;
