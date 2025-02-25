import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import {snackbarState} from '@recoil/atoms';
import {AuthService} from '@features/authentication';
import {Button, ErrorSnackbar} from '@components/ui';

const GuestSignin = ({label}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useRecoilState(snackbarState);

  const handleGuestSignIn = async () => {
    try {
      const formData = {
        email: 'guest@email.com',
        password: 'Guest@1',
      };

      await AuthService.signin(formData);
      queryClient.setQueryData(['authStatus'], true);

      navigate('/dashboard');
    } catch (error) {
      setShowSnackbar(true);

      let errorMessage = 'An unexpected error occurred.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      console.log(errorMessage);
    } finally {
      setTimeout(() => setShowSnackbar(false), 2000);
    }
  };

  return (
    <>
      <Button
        onClick={handleGuestSignIn}
        variant="secondary"
        label={label || 'Sign in as Guest'}
        fullWidth
      />

      {showSnackbar && (
        <ErrorSnackbar label="Sorry, guest sign-in is currently unavailable. Please try later." />
      )}
    </>
  );
};

export default GuestSignin;
