import {useState} from 'react';
import {Link} from 'react-router-dom';

import {useCurrentUser} from '@features/users';
import {navLinks} from '@data/constants';
import {closeSideBar, openSideBar} from '@assets';
import NavigationLink from './NavigationLink';
import Popup from './Popup';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const {data: currentUser, isError} = useCurrentUser();

  return (
    <div className="hidden lg:block">
      <div
        className={`sticky top-0 flex h-screen flex-col border-r border-gray-200 transition-[width] duration-100 dark:border-dark-800 ${open ? `w-[17rem]` : `w-[6rem]`}`}
      >
        <div className="m-6 bg-gradient-to-r from-gray-400 to-gray-950 bg-clip-text pl-3.5 font-palanquin text-2xl font-extrabold tracking-[.8px] text-transparent dark:from-gray-600 dark:to-white">
          <Link to="/">{open ? 'VaultX' : 'X'}</Link>
        </div>

        <div className="flex h-[calc(100%-160px)] w-full flex-col space-y-2 overflow-y-auto px-5 font-montserrat">
          {navLinks.map((navLink, index) => (
            <NavigationLink
              label={open && navLink.label}
              icon={navLink.icon}
              link={navLink.link}
              key={index}
            />
          ))}
        </div>

        {showPopup && (
          <div className="absolute bottom-[90px] left-5">
            <Popup hidePopup={() => setShowPopup(!showPopup)} />
          </div>
        )}

        <div className="absolute bottom-4 left-0 w-full">
          <div className="flex w-full flex-col space-y-1.5 px-5">
            <div className="flex justify-center">
              <button
                type="button"
                className={`transation-border group flex w-full cursor-pointer items-center space-x-3 rounded-lg border p-2 transition-colors focus:outline-none ${!open && `border-transparent`} ${open && `border-gray-100 hover:bg-gray-50 dark:border-dark-800 hover:dark:bg-dark-800/40`}`}
                onClick={() => setShowPopup(!showPopup)}
              >
                <span className="relative mx-auto flex size-9 shrink-0 overflow-hidden rounded-full group-focus:ring-2">
                  {isError ? (
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-red-400 font-semibold uppercase text-primary-foreground">
                      ?
                    </span>
                  ) : (
                    <img src={currentUser?.avatar} alt="avatar" />
                  )}
                </span>
                {open && (
                  <>
                    <div className="flex w-full flex-col truncate text-left">
                      <span className="truncate text-xs text-gray-400">
                        {isError ? (
                          <div className="font-normal leading-tight text-red-400">
                            Name couldn&apos;t load.
                          </div>
                        ) : (
                          currentUser?.name
                        )}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="flex size-8 text-gray-500/70 group-hover:text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      ></path>
                    </svg>
                  </>
                )}
              </button>

              <button
                className="absolute -right-[13px] bottom-3 block cursor-pointer bg-background"
                aria-label="Collapse sidebar"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={open ? closeSideBar : openSideBar}
                  alt={open ? 'Close SideBar' : 'Open Sidebar'}
                  className="size-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
