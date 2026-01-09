import { Trophy, Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  level: number;
  score: number;
  moves: number;
  onRestart: () => void;
}

const GameHeader = ({ level, score, moves, onRestart }: GameHeaderProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground drop-shadow-lg">
          Memory Game
        </h1>
        <Button
          onClick={onRestart}
          size="icon"
          variant="ghost"
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-card/90 backdrop-blur rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Zap className="w-4 h-4 text-accent" />
            <span>Level</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{level}</p>
        </div>

        <div className="flex-1 bg-card/90 backdrop-blur rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Trophy className="w-4 h-4 text-accent" />
            <span>Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{score}</p>
        </div>

        <div className="flex-1 bg-card/90 backdrop-blur rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <span className="text-accent">👆</span>
            <span>Moves</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{moves}</p>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
