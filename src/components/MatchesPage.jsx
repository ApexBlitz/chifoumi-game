import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://fauques.freeboxos.fr:3000/matches', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des parties.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [token]);

  const createMatch = async () => {
    try {
      const response = await axios.post(
        'http://fauques.freeboxos.fr:3000/matches',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMatches((prevMatches) => [...prevMatches, response.data]);
    } catch (err) {
      setError('Impossible de créer une nouvelle partie.');
    }
  };

  if (loading) {
    return <p>Chargement des parties...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Parties</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={createMatch}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Créer une Nouvelle Partie
      </button>

      {matches.length === 0 ? (
        <p>Aucune partie disponible.</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match) => (
            <li
              key={match._id}
              className="p-4 border rounded shadow hover:shadow-md"
            >
              <p>
                <strong>Joueur 1 :</strong> {match.user1?.username || 'En attente'}
              </p>
              <p>
                <strong>Joueur 2 :</strong> {match.user2?.username || 'En attente'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchesPage;
