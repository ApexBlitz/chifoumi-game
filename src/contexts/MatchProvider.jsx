import React, { createContext, useState } from 'react';
import * as MatchActions from './actions/match-action';

export const MatchContext = createContext();

export default function MatchProvider({ children }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await MatchActions.fetchMatches();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMatch = async () => {
    setLoading(true);
    try {
      const newMatch = await MatchActions.createMatch();
      setMatches((prev) => [newMatch, ...prev]);
    } catch (error) {
      console.error('Error creating match:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchDetails = async (matchId) => {
    setLoading(true);
    try {
      return await MatchActions.getMatchDetails(matchId);
    } catch (error) {
      console.error('Error fetching match details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchById = async (matchId) => {
    setLoading(true);
    try {
      const match = await MatchActions.getMatchById(matchId); // Appel de la fonction de l'action
      return match; // Retourne les détails du match
    } catch (error) {
      console.error('Error fetching match by ID:', error);
      throw error; // Relance l'erreur pour une gestion ultérieure
    } finally {
      setLoading(false);
    }
  };

  const playTurn = async (matchId, turnId, move) => {
    setLoading(true);
    try {
      return await MatchActions.playTurn(matchId, turnId, move);
    } catch (error) {
      console.error('Error playing turn:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatchContext.Provider
      value={{
        matches,
        loading,
        fetchMatches,
        createMatch,
        getMatchDetails,
        getMatchById,
        playTurn,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}


