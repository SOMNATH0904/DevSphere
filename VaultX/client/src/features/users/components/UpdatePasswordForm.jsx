import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {updatePasswordSchema} from '../validators';
import {snackbarState, formSubmissionState} from '@recoil/atoms';
import {useCurrentUser} from '@features/users';
import {Input, InputPassword, Button, FormSnackbar} from '@components/ui';

const UpdatePasswordForm = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
  });

  const [showSnackbar, setShowSnackbar] = useRecoilState(snackbarState);
  const setFormSubmission = useSetRecoilState(formSubmissionState);

  const {data: currentUser} = useCurrentUser();

  const onSubmitHandler = async data => {
    try {
      if (currentUser?.email === 'guest@email.com') {
        throw new Error(`Password update for guest users is not permitted`);
      }

      setFormSubmission(true);
      await onSubmit(data);
      reset();
    } catch (error) {
      setShowSnackbar(false);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error.message) {
        errorMessage = error.message;
      }

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError('message', {
        type: 'manual',
        message: errorMessage,
      });
    } finally {
      setTimeout(() => setFormSubmission(false), 500);
      setTimeout(() => setShowSnackbar(false), 2500);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-6">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <InputPassword
              props={register('oldPassword')}
              type="password"
              placeholder=""
              error={errors.oldPassword?.message}
              id="oldPassword"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <InputPassword
              props={register('newPassword')}
              type="password"
              placeholder=""
              error={errors.newPassword?.message}
              id="newPassword"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              className="w-full text-sm font-medium text-gray-400"
              htmlFor="confirmNewPassword"
            >
              Repeat New Password
            </label>
            <Input
              props={register('confirmNewPassword')}
              type="password"
              placeholder=""
              error={errors.confirmNewPassword?.message}
              id="confirmNewPassword"
            />
          </div>

          <div className="w-full sm:w-fit">
            <Button
              label="Update Password"
              onClick={() => setShowSnackbar(true)}
              isDisabled={!isValid}
              fullWidth
            />
          </div>

          {errors.message && (
            <p className="mt-4 text-center text-sm font-medium leading-tight text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>
      </form>

      {showSnackbar && (
        <FormSnackbar
          labels={{
            loading: 'Updating Password...',
            success: 'Password updated successfully',
          }}
        />
      )}
    </>
  );
};

export default UpdatePasswordForm;
