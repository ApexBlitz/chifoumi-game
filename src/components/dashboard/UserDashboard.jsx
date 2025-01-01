import React, { useState } from 'react';
import Carousel from '../carrousel/Carousel'; 
import Modal from '../carrousel/Modal'; 
import Button from '../carrousel/Button'; 
import Table from '../carrousel/Table'; 
import './Dashboard.css'; 

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carouselItems = [
    'https://via.placeholder.com/300x150?text=Slide+1',
    'https://via.placeholder.com/300x150?text=Slide+2',
    'https://via.placeholder.com/300x150?text=Slide+3',
  ];

  const tableHeaders = ['Nom', 'Score', 'Date'];
  const tableData = [
    ['Alice', '25', '2023-12-20'],
    ['Bob', '30', '2023-12-22'],
    ['Charlie', '15', '2023-12-24'],
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard Utilisateur</h1>

      {/* Carrousel */}
      <h2>Dernières parties</h2>
      <Carousel items={carouselItems} />

      {/* Bouton pour ouvrir une modal */}
      <Button onClick={() => setIsModalOpen(true)}>Afficher détails</Button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Détails de la partie</h2>
        <p>Voici les détails de votre dernière partie.</p>
      </Modal>

      {/* Table */}
      <h2>Historique des parties</h2>
      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
};

export default UserDashboard;
