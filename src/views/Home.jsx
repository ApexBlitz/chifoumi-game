import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MatchContext } from "@/contexts/MatchProvider";
import Cookies from "js-cookie";
import { UserCircle, Plus, Users } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const { matches, fetchMatches, createMatch, joinMatch, loading } = useContext(MatchContext);

  useEffect(() => {
    const token = Cookies.get("JWT");
    if (token) {
      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(parsedToken.username);
        fetchMatches();
      } catch (error) {
        console.error("Invalid token format:", error);
        setUsername(null);
      }
    }
  }, []);

  const handleCreateMatch = () => {
    createMatch()
      .then((match) => {
        fetchMatches();
        navigate(`/match/${match._id}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la création :", error);
      });
  };

  const handleJoinMatch = (matchId) => {
    joinMatch(matchId)
      .then(() => {
        navigate(`/match/${matchId}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la jonction :", error);
      });
  };

  const activeMatches = matches.filter((match) => match.turns.length < 3); 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ChiFouMi</h1>
      
      {username ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <UserCircle className="h-6 w-6" />
              <span className="font-medium">Bienvenue, {username}</span>
            </div>
            <Button 
              onClick={handleCreateMatch} 
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle partie
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement des parties...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeMatches.map((match) => (
                <Card key={match._id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Partie de {match.user1.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        Tours joués : {match.turns.length}/3
                      </div>
                      <div className="text-sm text-gray-400">{match._id}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    {!match.user2 && match.user1.username !== username && (
                      <Button 
                        onClick={() => handleJoinMatch(match._id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Rejoindre la partie
                      </Button>
                    )}
                    {(match.user2 || match.user1.username === username) && (
                      <Button onClick={() => navigate(`/match/${match._id}`)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                        variant="outline">Rejoindre la partie</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Veuillez vous connecter pour jouer.</p>
          <div className="space-x-4">
            <NavLink to="/auth/login">
              <Button variant="outline">Se connecter</Button>
            </NavLink>
            <NavLink to="/auth/register">
              <Button>S'inscrire</Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}