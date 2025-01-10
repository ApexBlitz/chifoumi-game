import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function FrontLayout() {
  const { loading } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); // Déplacer le hook ici

  useEffect(() => {
    const token = Cookies.get("JWT");

    if (token) {
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      setUsername(parsedToken.username);
    } else {
      setUsername(null);
    }
  }, []);

  // Définir handleLogout comme une fonction interne
  const handleLogout = () => {
    Cookies.remove("JWT");
    setUsername(null);
    navigate("/auth/login"); // Redirection après déconnexion
  };

  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <div className="flex items-center gap-6">
          <NavLink to="#" className="flex items-center">
            <MountainIcon className="h-6 w-6" />
          </NavLink>
          <NavLink
            to="/"
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-md font-medium"
          >
            Accueil
          </NavLink>
        </div>

        <nav className="ml-auto flex items-center gap-6">
          {loading ? (
            <span>Chargement...</span>
          ) : username ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Connecté en tant que : {username}</span>
              <Button variant="link" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </div>
          ) : (
            <>
              <NavLink to="/auth/login">
                <Button variant="secondary">
                  <LogIn />
                </Button>
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
