import { Link } from "react-router-dom";

const Navbar = () => {
  return (

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <a class="navbar-brand" href = "/">RateMyDate</a>

      <div class="navbar-nav">
        <a class="nav-link" href="/" role="button" aria-expanded="false">Search</a>
        <a class="nav-link" href="/newreview" role="button" aria-expanded="false">Add New Review</a>
      </div>
    </div>
</nav>

  );
};

export default Navbar;
