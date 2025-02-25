import {useEffect, useState} from 'react';
import {MouseParallax} from 'react-just-parallax';

const BackgroundCircles = ({parallaxRef}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="border-n-2/5 absolute -top-[42.375rem] left-1/2 -z-10 aspect-square w-[78rem] -translate-x-1/2 rounded-full md:-top-[38.5rem] xl:-top-[32rem]">
      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom rotate-[46deg]">
          <div
            className={`-ml-1 -mt-36 h-2 w-2 rounded-full bg-gradient-to-b from-[#DD734F] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom -rotate-[56deg]">
          <div
            className={`-ml-1 -mt-32 h-4 w-4 rounded-full bg-gradient-to-b from-[#DD734F] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom rotate-[54deg]">
          <div
            className={`transit -ml-1 mt-[12.9rem] hidden h-4 w-4 rounded-full bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] transition-transform duration-500 ease-out xl:block ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom -rotate-[65deg]">
          <div
            className={`-ml-1.5 mt-52 h-3 w-3 rounded-full bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom -rotate-[85deg]">
          <div
            className={`-ml-3 -mt-3 h-6 w-6 rounded-full bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className="w-0.25 absolute bottom-1/2 left-1/2 h-1/2 origin-bottom rotate-[70deg]">
          <div
            className={`-ml-3 -mt-3 h-6 w-6 rounded-full bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};

export default BackgroundCircles;
