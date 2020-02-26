const Navbar = () => {
  return (
    <nav class="navbar navbar-light bg-light ">
      <a class="navbar-brand" href="#">
        Navbar
      </a>

      <ul class="nav">
        <li class="nav-item active">
          <a class="nav-link text-dark" href="#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="#">
            Features
          </a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-dark" href="#">
            Pricing
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
