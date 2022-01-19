import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="narbar">
      <h1>RateMyDate</h1>
      <div className="links">
        <Link to="/">Search</Link>
        <Link to="/newreview">Add New Review</Link>
        <Link to="/uploadpicture">Picture</Link>
      </div>
    </nav>
  );
};

export default Navbar;
