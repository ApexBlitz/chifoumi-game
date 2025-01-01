import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetch(`/matches/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatch(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!match) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Détails de la partie</h1>
      <p>Joueur 1 : {match.user1.username}</p>
      <p>Joueur 2 : {match.user2?.username || "En attente"}</p>
      {/* Ajoutez plus de détails ici */}
    </div>
  );
};

export default MatchDetail;
