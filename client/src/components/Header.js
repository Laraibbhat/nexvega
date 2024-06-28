import React from "react";
import { NavLink } from "react-router-dom"; // Import for routing
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold"
        onClick={() => {
          navigate("/");
        }}
      >
        Nex Vega
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/admin"
              className="px-3 py-2 rounded hover:bg-gray-700"
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-3 py-2 rounded hover:bg-gray-700">
              Candidate List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
