import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import {hamburgerMenu} from '@assets';
import {ThemeToggler} from '@components';
import {dropdownState} from '@recoil/atoms';
import Dropdown from './Dropdown';

const NavBar = () => {
  const [showDropDrown, setShowDropDown] = useRecoilState(dropdownState);

  return (
    <>
      <nav className="relative z-10 lg:hidden">
        <div className="flex items-start justify-between border-b border-gray-100 p-4 pt-6 dark:border-primary/20">
          <div className="bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text font-palanquin text-2xl font-extrabold tracking-[.8px] text-transparent dark:from-gray-600 dark:to-white">
            <Link to="/">VaultX</Link>
          </div>
          <div className="flex items-center">
            <ThemeToggler />
            <button onClick={() => setShowDropDown(!showDropDrown)}>
              <img
                src={hamburgerMenu}
                alt="hamburger menu"
                className="h-8 dark:invert dark:filter"
              />
            </button>
          </div>
        </div>
        {showDropDrown && <Dropdown />}
      </nav>
    </>
  );
};

export default NavBar;
