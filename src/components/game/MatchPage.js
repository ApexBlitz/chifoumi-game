import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MatchPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [move, setMove] = useState('');

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(`http://fauques.freeboxos.fr:3000/matches/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMatch(response.data);
      } catch (error) {
        console.error(error);
        alert('Match not found');
      }
    };

    fetchMatch();
  }, [id]);

  const handleMove = async (move) => {
    try {
      const response = await axios.post(`http://fauques.freeboxos.fr:3000/matches/${id}/turns/1`, { move }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMove(move);
      alert('Move submitted!');
    } catch (error) {
      console.error(error);
      alert('Error submitting move');
    }
  };

  return (
    <div>
      {match ? (
        <>
          <h1>Match: {match.user1.username} vs {match.user2 ? match.user2.username : 'Waiting for player 2'}</h1>
          <h2>Current Turn: {match.turns.length + 1}</h2>
          <button onClick={() => handleMove('rock')}>Rock</button>
          <button onClick={() => handleMove('paper')}>Paper</button>
          <button onClick={() => handleMove('scissors')}>Scissors</button>
          <div>
            {move && <p>Your move: {move}</p>}
            {/* Show turn results */}
            {match.turns.map((turn, index) => (
              <div key={index}>
                <p>Turn {index + 1}: {turn.user1Move} vs {turn.user2Move}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading match...</p>
      )}
    </div>
  );
};

export default MatchPage;
