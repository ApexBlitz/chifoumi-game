import React from "react";

const AdminHome = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Nombre d'utilisateurs</h2>
          <p className="text-4xl">42</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Parties en cours</h2>
          <p className="text-4xl">7</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Parties terminées</h2>
          <p className="text-4xl">150</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
