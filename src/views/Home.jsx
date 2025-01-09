import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie"; 


export default function Home() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = Cookies.get("JWT");

    if (token) {
      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(parsedToken.username);
      } catch (error) {
        console.error("Invalid token format:", error);
        setUsername(null);
      }
    }
  }, []);


  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur ChiFouMi</h1>
      {username ? (
        <>
          <Button className="bg-slate-600 hover:bg-slate-700">
            Créer ou Rejoindre une Partie
          </Button>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-4">Veuillez vous connecter pour jouer.</p>
          <NavLink to="/auth/login">
            <Button variant="secondary" className="mr-5">Se connecter</Button>
          </NavLink>
          
          <NavLink to="/auth/register">
            <Button>S&apos;inscrire</Button>
          </NavLink>
        </>
        
      )}
    </div>
  );
}











