import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto text-white flex justify-between">
        <h1 className="text-lg">Chi Fou Mi</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
