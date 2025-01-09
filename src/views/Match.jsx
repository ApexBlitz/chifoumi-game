import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RockingChairIcon as Rock, PaperclipIcon as Paper, Scissors, Lock } from "lucide-react";
import Cookies from "js-cookie";
import Confetti from "react-confetti";
import { MatchContext } from "@/contexts/MatchProvider";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (polling) {
        fetchMatch();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [polling]);

  const fetchMatch = async () => {
    try {
      const result = await getMatchById(matchId);
      setMatch(result);
      if (result.turns.length >= 3 && bothPlayersPlayed(result)) {
        setPolling(false);
        if (result.winner) {
          const currentUsername = Cookies.get("username");
          if (currentUsername === result.winner.username) {
            setShowConfetti(true);
          }
        }        
      }
    } catch (err) {
      setError("Failed to load match details.");
      setPolling(false);
    } finally {
      setLoading(false);
    }
  };

  const bothPlayersPlayed = (currentMatch) => {
    const turns = currentMatch.turns || [];
    const lastTurn = turns[turns.length - 1] || {};
    return lastTurn.user1 && lastTurn.user2;
  };

  const calculateTurnNumber = () => {
    const turns = match.turns || [];
    const lastTurn = turns[turns.length - 1] || {};
    const bothPlayed = lastTurn.user1 && lastTurn.user2;

    if (turns.length === 0 || bothPlayed) {
      return Math.min(turns.length + 1, 3);
    } else {
      return turns.length;
    }
  };

  const handleChoice = (choice) => {
    if (!isLocked) {
      setPlayerChoice(choice);
    }
  };

  const lockChoice = async () => {
    setIsLocked(true);
    const turnId = calculateTurnNumber();
  
    try {
      setPolling(false);
      await playTurn(matchId, turnId, playerChoice);
      await fetchMatch();
    } catch (error) {
      console.error("Error playing turn:", error);
    } finally {
      setPolling(true); 
      setIsLocked(false);
    }
  };
  

  const resetForNextTurn = () => {
    setTimeout(() => {
      setPlayerChoice(null);
      setResetting(false);
    }, 3000);
    setResetting(true);
  };

  if (loading) return <p>Loading match details...</p>;
  if (error) return <p>{error}</p>;

  const isMatchReady = match.user1 && match.user2;
  const isGameFinished = match.turns.length >= 3 && bothPlayersPlayed(match);
  const currentTurn = match.turns[match.turns.length - 1];
  const currentUsername = Cookies.get("username");
  const isPlayer1 = currentUsername === match.user1.username;

  const determinePointColor = (turn) => {
    if (!turn) return "bg-gray-600";
    if (turn.winner === "draw") return "bg-yellow-500";
    if ((isPlayer1 && turn.winner === "user1") || (!isPlayer1 && turn.winner === "user2")) {
      return "bg-green-500";
    }
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti emojis={['🎉', '🎮', '✨']} recycle={false} />}

      <h1 className="text-4xl font-bold text-white mb-8">{match.user1.username} vs {match.user2.username}</h1>

      <div className="flex space-x-2 mb-6">
        {[0, 1, 2].map((round) => (
          <div
            key={round}
            className={`w-4 h-4 rounded-full ${
              determinePointColor(match.turns[round])
            }`}
          />
        ))}
      </div>

      {isMatchReady ? (
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-8 mb-8">
            <GameCard
              choice={currentTurn?.user1}
              isRevealed={bothPlayersPlayed(match) && !resetting}
            />
            <GameCard
              choice={currentTurn?.user2}
              isRevealed={bothPlayersPlayed(match) && !resetting}
            />
          </div>

          {currentTurn?.winner && bothPlayersPlayed(match) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-4"
            >
              {(() => {
                const winner = currentTurn.winner;

                if (winner === "draw") return "It's a draw!";
                if ((isPlayer1 && winner === "user1") || (!isPlayer1 && winner === "user2")) {
                  return "You win!";
                }
                return "You lose!";
              })()}
            </motion.div>
          )}

          {!isGameFinished ? (
            <>
             <div className="flex space-x-4 mb-4">
                <Button
                  onClick={() => handleChoice("rock")}
                  disabled={isLocked}
                  className={`bg-red-500 hover:bg-red-600 ${
                    isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Rock className="mr-2" /> Rock
                </Button>
                <Button
                  onClick={() => handleChoice("paper")}
                  disabled={isLocked}
                  className={`bg-blue-500 hover:bg-blue-600 ${
                    isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Paper className="mr-2" /> Paper
                </Button>
                <Button
                  onClick={() => handleChoice("scissors")}
                  disabled={isLocked}
                  className={`bg-green-500 hover:bg-green-600 ${
                    isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Scissors className="mr-2" /> Scissors
                </Button>
              </div>
              <Button
                onClick={lockChoice}
                disabled={!playerChoice || isLocked || resetting}
                className="mb-4"
              >
                <Lock className="mr-2" /> Lock Choice
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl text-red-500 font-bold mt-4">
                {match.winner === "draw"
                  ? "The match ended in a draw."
                  : `${match.winner.username} wins the game!`}
              </h1>
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
