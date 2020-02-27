import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgess from 'nprogress';

import { isAuth, logout } from '../helpers/auth';

Router.onRouteChangeStart = () => NProgess.start();
Router.onRouteChangeComplete = () => NProgess.done();

const Navbar = () => {
  const router = useRouter();

  const isAdminOrRoot =
    (isAuth() && isAuth().role === 'root') ||
    (isAuth() && isAuth().role === 'admin');

  return (
    <nav className="navbar bg-dark ">
      <a className="navbar-brand text-light">App</a>

      <ul className="nav">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link text-light">
              <p className={router.pathname === '/' ? 'link active' : 'link'}>
                Home
              </p>
            </a>
          </Link>
        </li>

        {isAuth() && isAdminOrRoot && (
          <li className="nav-item ml-auto">
            <Link href="/admin">
              <a className="nav-link text-light">
                <p
                  className={
                    router.pathname === '/admin' ? 'link active' : 'link'
                  }
                >
                  {isAuth().name}
                </p>
              </a>
            </Link>
          </li>
        )}

        {isAuth() && isAuth().role === 'user' && (
          <li className="nav-item ml-auto">
            <Link href="/user">
              <a className="nav-link text-light">
                <p
                  className={
                    router.pathname === '/user' ? 'link active' : 'link'
                  }
                >
                  {isAuth().name}
                </p>
              </a>
            </Link>
          </li>
        )}

        {!isAuth() && (
          <>
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link text-light">
                  <p
                    className={
                      router.pathname === '/login' ? 'link active' : 'link'
                    }
                  >
                    Login
                  </p>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link text-light">
                  <p
                    className={
                      router.pathname === '/register' ? 'link active' : 'link'
                    }
                  >
                    Register
                  </p>
                </a>
              </Link>
            </li>
          </>
        )}

        {isAuth() && (
          <li className="nav-item">
            <a onClick={logout} className="nav-link text-light">
              Log Out
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
