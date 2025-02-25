import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Link} from 'react-router-dom';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {updateProfileSchema} from '../validators';
import {snackbarState, formSubmissionState} from '@recoil/atoms';
import {useCurrentUser} from '@features/users';
import {Input, Button, FormSnackbar} from '@components/ui';

const UpdateProfileForm = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onChange',
  });

  const [showSnackbar, setShowSnackbar] = useRecoilState(snackbarState);
  const setFormSubmission = useSetRecoilState(formSubmissionState);

  const {data: currentUser} = useCurrentUser();

  const onSubmitHandler = async data => {
    try {
      if (currentUser?.email === 'guest@email.com') {
        throw new Error(`Profile update for guest users is not permitted`);
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
              htmlFor="name"
            >
              Your Name
            </label>
            <Input
              props={register('name')}
              type="text"
              placeholder=""
              error={errors.name?.message}
              id="name"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-fit">
              <Button
                label="Update Profile"
                onClick={() => setShowSnackbar(true)}
                isDisabled={!isValid}
                fullWidth
              />
            </div>

            <Link
              className="flex w-full items-center transition-transform duration-500 ease-out sm:w-fit"
              to="/profile/password"
            >
              <Button variant="secondary" label="Update Password" fullWidth />
            </Link>
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
            loading: 'Updating Name...',
            success: 'Name updated successfully',
          }}
        />
      )}
    </>
  );
};

export default UpdateProfileForm;
