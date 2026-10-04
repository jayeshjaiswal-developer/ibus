import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/home")}
      >
        iBus
      </div>

      <div className="navbar-right">

        <button
          className="nav-button"
          onClick={() => navigate("/my-bookings")}
        >
          My Bookings
        </button>

        <button
          className="nav-button logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;