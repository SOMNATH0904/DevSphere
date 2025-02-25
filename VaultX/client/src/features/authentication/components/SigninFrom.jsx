import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';

import {signinSchema} from '../validators';
import {Input, Button, InputPassword} from '@components/ui';

const SigninForm = ({onSubmit, buttonText}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setFocus,
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmitHandler = async data => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError('message', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
      <div className="flex-col space-y-3">
        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="email"
          >
            Email Address
          </label>
          <Input
            props={register('email')}
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            id="email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            className="w-full text-sm font-medium text-gray-400"
            htmlFor="password"
          >
            Password
          </label>
          <InputPassword
            props={register('password')}
            type="password"
            placeholder=""
            error={errors.password?.message}
            id="password"
          />
        </div>

        <Button
          label={buttonText}
          corners="md"
          fullWidth
          isDisabled={!isValid}
        />
      </div>

      {errors.message && (
        <p className="mt-4 text-center text-xs font-normal leading-tight text-red-400">
          {errors.message.message}
        </p>
      )}
    </form>
  );
};

export default SigninForm;
