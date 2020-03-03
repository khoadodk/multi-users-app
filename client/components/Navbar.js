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
      <a className="navbar-brand text-light"></a>

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
                  {isAuth().username}
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
                  {isAuth().username}
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
          <>
            <li className="nav-item">
              <a onClick={logout} className="nav-link text-light">
                <p className="link">Log Out</p>
              </a>
            </li>
          </>
        )}

        <Link href="/user/link/create">
          <a className="btn btn-outline-info ml-3">Post Links</a>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
