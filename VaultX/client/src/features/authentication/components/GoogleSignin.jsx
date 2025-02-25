import {googleLogo} from '@assets';
import {AuthService} from '@features/authentication';

const GoogleSignin = () => {
  const handleGoogleSignin = () => {
    AuthService.googleSignin();
  };

  return (
    <button
      className="relative inline-flex w-full items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium text-gray-600 ring-primary/70 transition-all hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 dark:border-dark-800 dark:text-gray-200 dark:shadow-2xl dark:ring-primary/70 dark:hover:border-dark-800 dark:hover:bg-background/50 dark:focus:ring-offset-dark-800"
      onClick={handleGoogleSignin}
    >
      <img
        src={googleLogo}
        alt="google logo"
        className="absolute left-2 size-10"
      />
      <span className="font-montserrat text-sm font-normal">
        Sign in with Google
      </span>
    </button>
  );
};

export default GoogleSignin;
