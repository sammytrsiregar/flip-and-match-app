import MemoryCard from "@/components/MemoryCard";
import GameHeader from "@/components/GameHeader";
import LevelComplete from "@/components/LevelComplete";
import { useMemoryGame } from "@/hooks/useMemoryGame";

const Index = () => {
  const {
    level,
    score,
    moves,
    cards,
    isChecking,
    isLevelComplete,
    handleCardClick,
    nextLevel,
    restartGame,
  } = useMemoryGame();

  return (
    <div className="min-h-screen game-gradient flex flex-col items-center justify-center p-4 safe-area-inset">
      <GameHeader
        level={level}
        score={score}
        moves={moves}
        onRestart={restartGame}
      />

      <div className="w-full max-w-md mx-auto">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${cards.length <= 8 ? 4 : 4}, 1fr)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bounce-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MemoryCard
                emoji={card.emoji}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
                disabled={isChecking}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-primary-foreground/80 text-sm">
        Tap cards to find matching pairs!
      </p>

      {isLevelComplete && (
        <LevelComplete
          level={level}
          score={score}
          moves={moves}
          onNextLevel={nextLevel}
        />
      )}
    </div>
  );
};

export default Index;
