import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MatchContext } from "@/contexts/MatchProvider";
import Cookies from "js-cookie";
import { UserCircle, Plus, Users } from "lucide-react";
import GameDesc  from "@/components/GameDesc"

export default function Home() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { matches, fetchMatches, createMatch, loading } = useContext(MatchContext);

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
  

  const handleCreateMatch = async () => {
    try {
      const match = await createMatch();
  
      await fetchMatches();
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      setError("Une erreur est survenue lors de la création de la partie.");
    }
  };
  
  const activeMatches = matches?.filter((match) => 
    match && match.turns && match.turns.length < 3
  ) || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ChiFouMi</h1>
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      
      {username ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <UserCircle className="h-6 w-6" />
              <span className="font-medium">Bienvenue, {username}</span>
            </div>
            <Button onClick={handleCreateMatch} 
              className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />Créer ou rejoindre une partie
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement des parties...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeMatches.map((match) => {
                  if (!match || !match.user1) {
                      console.warn("Invalid match object detected:", match);
                      return null; // Skip invalid match entries
                  }
                  return <GameDesc key={match._id} match={match} username={username} />;
              })}
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
              <Button>S&apos;inscrire</Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

