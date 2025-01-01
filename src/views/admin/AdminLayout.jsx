import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="bg-gray-800 text-white w-64 p-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "text-blue-300" : "text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? "text-blue-300" : "text-white"
              }
            >
              Utilisateurs
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
