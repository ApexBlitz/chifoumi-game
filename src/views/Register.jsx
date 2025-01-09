import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle } from "lucide-react";
import { addUser } from "@/contexts/actions/user-action";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null); 
    setSuccess(false); 

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await addUser({ username: username, password });
      setPassword("");
      setConfirmPassword("");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/auth/login");
      }, 5000);
    } catch (err) {
      const errorMessage = err.error || "Une erreur est survenue.";
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
      {success && (
        <Alert variant="success" className="mb-5">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>Inscription réussie ! Vous serez redirigé dans quelques secondes.</AlertDescription>
        </Alert>
      )}

      <h1 className="text-4xl font-bold">S&apos;inscrire</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Entrez votre email et un mot de passe pour vous inscrire
      </p>
      
      <div className="mt-10 flex flex-col w-full space-y-6">
        <div className="w-full">
          <Label htmlFor="email">Username</Label>
          <Input id="username" type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="w-full">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" placeholder="•••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="w-full">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input id="confirmPassword" type="password" placeholder="•••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <Button className="w-full bg-slate-600 hover:bg-slate-700" onClick={handleRegister}>S&apos;inscrire</Button>
        <span className="text-gray-600 text-center">
          Déjà inscrit ? <a href="/auth/login" className="underline">Se connecter</a>
        </span>
      </div>
    </>
  );
}







