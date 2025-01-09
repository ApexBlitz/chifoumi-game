import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MatchContext } from "@/contexts/MatchProvider";
import { Button } from "@/components/ui/button";

export default function Match() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { getMatchById, playTurn } = useContext(MatchContext);

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (polling) {
        fetchMatch();
      }
    }, 2000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [polling]);

  const fetchMatch = async () => {
    try {
      const result = await getMatchById(matchId);
      setMatch(result);

      // Arrêter le polling si le match est complet
      if (result.turns.length >= 3 && bothPlayersPlayed(result)) {
        setPolling(false);
      }
    } catch (err) {
      console.error("Error fetching match:", err);
      setError("Failed to load match details.");
      setPolling(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateTurnNumber = () => {
    const turns = match.turns || [];
    const lastTurn = turns[turns.length - 1] || {};
    const bothPlayed = lastTurn.user1 && lastTurn.user2;

    if (turns.length === 0 || bothPlayed) {
      return Math.min(turns.length + 1, 3); // Limite les tours à 3
    } else {
      return turns.length;
    }
  };

  const bothPlayersPlayed = (currentMatch) => {
    const turns = currentMatch.turns || [];
    const lastTurn = turns[turns.length - 1] || {};
    return lastTurn.user1 && lastTurn.user2;
  };

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };

  const lockChoice = async () => {
    setIsLocked(true);
    const turnId = calculateTurnNumber();
    try {
      setPolling(false); // Suspendre le polling temporairement
      await playTurn(matchId, turnId, playerChoice);
      await fetchMatch(); // Récupérer les données immédiatement après avoir joué
    } catch (error) {
      console.error("Error playing turn:", error);
    } finally {
      setPolling(true); // Reprendre le polling après la mise à jour
      setIsLocked(false); // Réactiver les choix
    }
  };

  const getWinner = () => {
    if (match.winner) {
      if (typeof match.winner === "object") {
        return `The winner is ${match.winner.username}!`;
      }
      if (match.winner === "draw") {
        return "The match ended in a draw.";
      }
    }

    const allDraws = match.turns.every((turn) => turn.winner === "draw");
    if (allDraws) {
      return "The match ended in a draw.";
    }

    return "The match is over!";
  };

  if (loading) return <p>Loading match details...</p>;
  if (error) return <p>{error}</p>;

  const isMatchReady = match.user1 && match.user2;
  const isGameFinished = match.turns.length >= 3 && bothPlayersPlayed(match);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Chifoumi Game</h1>
      {isMatchReady ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <p className="text-lg text-white mb-4">
              Players: {match.user1.username} vs {match.user2.username}
            </p>
            <div className="flex justify-center space-x-8 mb-4">
              {match.turns.map((turn) => (
                <div key={turn.turnId} className="text-white">
                  <p>Turn {turn.turnId}:</p>
                  <p>
                    {match.user1.username} chose{" "}
                    {turn.user1 ? turn.user1 : "Waiting..."}
                  </p>
                  <p>
                    {match.user2.username} chose{" "}
                    {turn.user2 ? turn.user2 : "Waiting..."}
                  </p>
                  {turn.winner && (
                    <p>
                      Winner:{" "}
                      {turn.winner === "draw"
                        ? "Draw"
                        : turn.winner === "user1"
                        ? match.user1.username
                        : match.user2.username}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {!isGameFinished ? (
            <>
              <div className="flex space-x-4 mb-4">
                <Button
                  onClick={() => handleChoice("rock")}
                  disabled={isLocked || isGameFinished}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Rock
                </Button>
                <Button
                  onClick={() => handleChoice("paper")}
                  disabled={isLocked || isGameFinished}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Paper
                </Button>
                <Button
                  onClick={() => handleChoice("scissors")}
                  disabled={isLocked || isGameFinished}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Scissors
                </Button>
              </div>
              <Button
                onClick={lockChoice}
                disabled={!playerChoice || isLocked || isGameFinished}
                className="mb-4"
              >
                Lock Choice
              </Button>
            </>
          ) : (
            <>
              <p className="text-lg text-white mt-4">
                {getWinner() || "The match is over!"}
              </p>
              <Button
                onClick={() => navigate("/")}
                className="mt-4 bg-purple-500 hover:bg-purple-600"
              >
                Return to Home
              </Button>
            </>
          )}
        </div>
      ) : (
        <p className="text-yellow-500 text-lg">Waiting for another player to join...</p>
      )}
    </div>
  );
}
