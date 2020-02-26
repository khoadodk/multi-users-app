import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgess from 'nprogress';

Router.onRouteChangeStart = () => NProgess.start();
Router.onRouteChangeComplete = () => NProgess.done();

const Navbar = () => {
  const router = useRouter();

  const isActive = route => {
    return route === router.pathname;
  };

  return (
    <nav className="navbar bg-dark ">
      <a className="navbar-brand text-light">App</a>

      <ul className="nav">
        <li className="nav-item active">
          <Link href="/">
            <a className="nav-link text-light">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/login">
            <a className="nav-link text-light">Login</a>
          </Link>
        </li>
        <li className="nav-item ">
          <Link href="/register">
            <a className="nav-link text-light">Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
