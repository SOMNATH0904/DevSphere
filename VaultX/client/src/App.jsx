import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import {useAuthStatus} from '@hooks';
import {NavBar, SideBar} from '@layouts';
import {
  Home,
  Signin,
  Signup,
  Dashboard,
  Transfer,
  Transactions,
  Profile,
} from '@pages';
import {UpdatePassword} from '@features/users';
import {ThemeToggler, SourceCode} from '@components';
import {sourceCodeLink} from '@data/constants';
import {githubLogo} from '@assets';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavigation = !['/', '/signin', '/signup'].includes(
    location.pathname,
  );

  const {data: isAuthenticated} = useAuthStatus();

  useEffect(() => {
    if (['/', '/signin', '/signup'].includes(location.pathname)) return;
    if (!isAuthenticated) navigate('/');
  }, [location, isAuthenticated, navigate]);

  return (
    <>
      <header>{renderNavigation && <NavBar />}</header>

      <section className="flex">
        {renderNavigation && (
          <aside>
            <SideBar />
          </aside>
        )}

        <main
          className={`h-[100vh-73px] basis-full overflow-y-auto lg:h-screen ${!renderNavigation && `max-container relative`}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/password" element={<UpdatePassword />} />
          </Routes>

          {!renderNavigation && (
            <div className="pointer-events-auto absolute right-0 top-6 px-2 py-3.5 lg:right-5">
              <ThemeToggler />
            </div>
          )}

          <SourceCode link={sourceCodeLink} icon={githubLogo} />
        </main>
      </section>
    </>
  );
};

export default App;
