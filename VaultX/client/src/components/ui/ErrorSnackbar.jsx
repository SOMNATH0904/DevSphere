import {useSetRecoilState} from 'recoil';

import {snackbarState} from '@recoil/atoms';
import {closeIcon} from '@assets';

const ErrorSnackbar = ({label}) => {
  const setShowSnackbar = useSetRecoilState(snackbarState);

  return (
    <section
      tabIndex="-1"
      aria-live="assertive"
      className="fixed bottom-0 right-5 z-40 w-full max-w-[20rem] translate-y-[-20px] transform transition-all delay-[1000ms] duration-300 ease-in-out xs:max-w-[24rem]"
    >
      <div className="flex w-full items-start gap-2 rounded-lg border border-gray-200 bg-popover p-4 px-6 shadow-lg dark:border-dark-800 dark:shadow-2xl dark:shadow-primary/40">
        <div className="basis-full self-center font-montserrat text-[16px] font-medium text-red-400">
          {label || 'Something went wrong. Please try again.'}
        </div>

        <button
          type="button"
          onClick={() => setShowSnackbar(false)}
          className="flex-shrink-0"
        >
          <img
            src={closeIcon}
            alt="Close"
            className="size-6 dark:invert dark:filter"
          />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </section>
  );
};

export default ErrorSnackbar;
