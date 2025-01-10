import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";


export default function GameDesc({ match, username }) {
    const navigate = useNavigate();

    if (!match) {
        console.error("Match prop is undefined in GameDesc");
        return null;
    }

    return (
        <Card key={match._id} className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Partie de {match.user1?.username || "Inconnu"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    <div className="text-sm text-gray-600">Tours joués : {match.turns?.length || 0}/3</div>
                    <div className="text-sm text-gray-400">{match._id}</div>
                </div>
            </CardContent>

            <CardFooter className="mt-auto">
                {!match.user2 && match.user1?.username !== username && (
                    <Button
                        onClick={() => navigate(`/matches/${match._id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Rejoindre la partie
                    </Button>
                )}

                {(match.user2 || match.user1?.username === username) && (
                    <Button
                        onClick={() => navigate(`/match/${match._id}`)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                        variant="outline"
                    >
                        Rejoindre la partie
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}


