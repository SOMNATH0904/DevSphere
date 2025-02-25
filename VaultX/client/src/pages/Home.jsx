import {useNavigate} from 'react-router-dom';

import {useAuthStatus} from '@hooks';
import {Button, BackgroundCircles} from '@components/ui';
import {rightArrow, wallet} from '@assets';

const Home = () => {
  const navigate = useNavigate();
  const {data: isAuthenticated} = useAuthStatus();

  const handleSetStarted = () => {
    isAuthenticated ? navigate('/dashboard') : navigate('/signin');
  };

  return (
    <section className="max-container relative flex h-screen flex-col items-center justify-center overflow-hidden px-1 md:flex-row-reverse">
      <p className="absolute left-5 top-10 animate-pulse font-montserrat">
        From{' '}
        <a href="https://yntp.me" target="_blank">
          <span className="font-medium">Jatin Verma</span>
        </a>
        ...
      </p>

      <img
        src={wallet}
        className="h-80 dark:drop-shadow-[0_0_8rem_#646cff] lg:h-[600px]"
      />

      <div className="flex-shrink-0 max-md:text-center">
        <h1 className="md:text-5xl mt-4 bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text font-palanquin text-[72px] font-extrabold text-transparent dark:from-gray-600 dark:to-white max-sm:leading-[82px] lg:mt-2 lg:text-[80px] xl:text-8xl">
          VaultX
        </h1>
        <h2 className="mb-10 mt-2 bg-clip-text pt-2 font-montserrat text-lg text-foreground md:mt-1 md:text-[22px] lg:mb-14 lg:pt-3 lg:text-2xl lg:leading-8 xl:pt-6 xl:text-[26px]">
          Secure Payments. Simple&nbsp;Transfers.
        </h2>
        <Button
          onClick={handleSetStarted}
          label="Get Started"
          icon={rightArrow}
          corners="full"
          variant="hero"
          iconPosition="right"
        />
      </div>

      <div className="absolute bottom-56">
        <BackgroundCircles />
      </div>
    </section>
  );
};

export default Home;
