import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://fauques.freeboxos.fr:3000/matches', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);

  const handleCreateMatch = async () => {
    try {
      const response = await axios.post('http://fauques.freeboxos.fr:3000/matches', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMatches([...matches, response.data]);
    } catch (error) {
      console.error(error);
      alert('You already have a match!');
    }
  };

  return (
    <div>
      <h1>Matches</h1>
      <button onClick={handleCreateMatch}>Create Match</button>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            <Link to={`/matches/${match.id}`}>
              {match.user1.username} vs {match.user2 ? match.user2.username : 'Waiting for player 2'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesPage;
