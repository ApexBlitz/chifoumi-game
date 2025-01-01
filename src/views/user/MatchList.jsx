import React, { useEffect, useState } from "react";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/matches", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Liste des parties</h1>
      <ul>
        {matches.map((match) => (
          <li key={match._id}>
            Match entre {match.user1.username} et {match.user2?.username || "En attente"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
