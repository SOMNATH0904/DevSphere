import {useQueryClient} from '@tanstack/react-query';
import {Link, useNavigate} from 'react-router-dom';

import {
  GoogleSignin,
  SignupForm,
  GuestSignin,
  AuthService,
} from '@features/authentication';

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignup = async formData => {
    await AuthService.signup(formData);
    queryClient.setQueryData(['authStatus'], true);

    navigate('/dashboard');
  };

  return (
    <section className="max-container relative flex h-screen flex-col items-center justify-center">
      <p className="absolute left-5 top-6 mb-6 bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text font-palanquin text-3xl font-extrabold text-transparent dark:from-gray-600 dark:to-white sm:static">
        <Link to="/">VaultX</Link>
      </p>

      <div className="mt-16 flex w-full max-w-[28rem] flex-col items-center space-y-2 rounded-xl border-transparent bg-white px-5 py-6 dark:bg-transparent sm:mt-0 md:px-8 dark:md:shadow-[0_0_1200px_0] dark:md:shadow-primary/30 lg:bg-background lg:px-6">
        <div>
          <h5 className="mb-4 font-palanquin text-xl font-medium">
            Create an account
          </h5>
        </div>

        <GoogleSignin />

        <div>
          <span className="text-xs text-gray-400">or continue with email</span>
        </div>

        <SignupForm onSubmit={handleSignup} buttonText="Get started" />

        <p className="flex space-x-2 pb-3 font-montserrat text-sm">
          <span>Already have an account?</span>
          <Link to="/signin" className="text-primary-700 dark:text-primary-400">
            Sign In
          </Link>
        </p>

        <GuestSignin label="Try out as Guest" />
      </div>
    </section>
  );
};

export default Signup;
