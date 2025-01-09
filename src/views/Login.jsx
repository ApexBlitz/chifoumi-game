import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { loginUser } from "@/contexts/actions/user-action";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    try {
      await loginUser({ username, password });
    
      navigate("/"); 
    } catch (err) {
      const errorMessage = err.error || "Une erreur est survenue.";
      setPassword("");
      setError(errorMessage);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-5">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <h1 className="text-4xl font-bold">Se connecter</h1>
      <p className="text-gray-500 dark:text-gray-400">Entrez vos identifiants pour accéder à votre compte.</p>

      <div className="mt-10 flex flex-col w-full space-y-6">
        <div className="w-full">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="w-full">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" placeholder="•••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <Button className="w-full bg-slate-600 hover:bg-slate-700" onClick={handleLogin}>Connexion</Button>
        <span className="text-gray-600 text-center">
          Pas encore inscrit ? <a href="/auth/register" className="underline">S&apos;inscrire</a>
        </span>
      </div>
    </>
  );
}



