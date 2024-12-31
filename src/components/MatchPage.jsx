import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MatchPage = () => {
  const { id } = useParams(); // ID du match depuis l'URL
  const [match, setMatch] = useState(null);
  const [playerMove, setPlayerMove] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Charger les données du match
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT depuis localStorage
        const response = await axios.get(`/matches/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatch(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du match.");
      }
    };
    fetchMatchData();
  }, [id]);

  // Jouer un coup
  const handleMove = async (move) => {
    setError("");
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/matches/${id}/turns/${match.turns.length + 1}`,
        { move },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Coup envoyé avec succès !");
      setPlayerMove(move);
      setMatch(response.data); // Mettre à jour l'état du match après le coup
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'envoi du coup.");
    }
  };

  // Vérifier si le match est terminé
  const isMatchFinished = match && match.winner;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Match : {id}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      {match ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Joueurs</h2>
            <p>Joueur 1 : {match.user1.username}</p>
            <p>Joueur 2 : {match.user2?.username || "En attente d'un adversaire..."}</p>
          </div>
          {isMatchFinished ? (
            <p className="text-xl font-bold text-green-500">
              Match terminé ! Gagnant : {match.winner === "draw" ? "Égalité" : match.winner}
            </p>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Faites votre choix :</h2>
              <div className="flex gap-4 my-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleMove("rock")}
                >
                  Pierre
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleMove("paper")}
                >
                  Feuille
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleMove("scissors")}
                >
                  Ciseaux
                </button>
              </div>
              <p className="text-gray-600">Coup joué : {playerMove || "Aucun"}</p>
            </>
          )}
        </>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default MatchPage;
