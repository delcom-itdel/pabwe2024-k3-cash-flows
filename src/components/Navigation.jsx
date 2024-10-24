import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket, FaList } from "react-icons/fa6";
import { useState, useEffect } from "react";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;
  const [labels, setLabels] = useState([]);

  // Fetch data for labels
  useEffect(() => {
    async function fetchLabels() {
      try {
        const response = await fetch("/cash-flows/labels");
        const data = await response.json();
        setLabels(data);
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    }
    fetchLabels();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="judul">Cash Flow K3</div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navApp"
          aria-controls="navApp"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navApp">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Reordered buttons and styled them */}
            <li className="nav-item mx-2">
              <Link
                className="btn btn-light btn-sm text-dark"
                to="/cash-flows/add"
              >
                <FaPlus className="me-1" /> Create Cash Flow
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className="btn btn-light btn-sm text-dark"
                to="/cash-flows/labels"
              >
                <FaList className="me-1" /> Cash Flow Labels
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className="btn btn-light btn-sm text-dark"
                to="/cash-flows/stats/daily"
              >
                Get Stats Daily
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link
                className="btn btn-light btn-sm text-dark"
                to="/cash-flows/stats/monthly"
              >
                Get Stats Monthly
              </Link>
            </li>

            {/* User profile dropdown */}
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navUser"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="nav-profile"
                  src={photo || "/default-profile.png"}
                  alt={id}
                  title={name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navUser"
              >
                <li>
                  <Link className="dropdown-item" to="/users/me">
                    <FaUser className="me-1" /> Profile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={onAuthSignOut}
                  >
                    <FaRightFromBracket className="me-1" /> Sign out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

Navigation.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;
