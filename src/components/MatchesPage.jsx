import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MatchPage = () => {
  const { id } = useParams(); // Get match ID from URL params
  const [match, setMatch] = useState(null);
  const [playerMove, setPlayerMove] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/matches/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatch(response.data);
      } catch (err) {
        setError('Error loading match data.');
      }
    };
    fetchMatchData();
  }, [id]);

  const handleMove = async (move) => {
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/matches/${id}/turns/${match.turns.length + 1}`,
        { move },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Move sent successfully!');
      setPlayerMove(move);
      setMatch(response.data); // Update match state after the move
    } catch (err) {
      setError('Error sending the move.');
    }
  };

  const isMatchFinished = match && match.winner;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Match: {id}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      {match ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Players</h2>
            <p>Player 1: {match.user1.username}</p>
            <p>Player 2: {match.user2?.username || 'Waiting for opponent'}</p>
          </div>
          {isMatchFinished ? (
            <p className="text-xl font-bold text-green-500">
              Match finished! Winner: {match.winner === 'draw' ? 'Draw' : match.winner}
            </p>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Make your move:</h2>
              <div className="flex gap-4 my-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleMove('rock')}
                >
                  Rock
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleMove('paper')}
                >
                  Paper
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleMove('scissors')}
                >
                  Scissors
                </button>
              </div>
              <p className="text-gray-600">Move played: {playerMove || 'None'}</p>
            </>
          )}
        </>
      ) : (
        <p>Loading match data...</p>
      )}
    </div>
  );
};

export default MatchPage;
