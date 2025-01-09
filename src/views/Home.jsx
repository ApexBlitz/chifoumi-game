import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie"; 


export default function Home() {

  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur ChiFouMi</h1>
        <>
          <p className="text-gray-600">Veuillez vous connecter pour jouer.</p>
          <NavLink to="/auth/login">
            <Button variant="secondary">Se connecter</Button>
          </NavLink>
          
          <NavLink to="/auth/register">
            <Button>S&apos;inscrire</Button>
          </NavLink>
        </>
    </div>
  );
}






