import { cn } from "@/lib/utils";

interface MemoryCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

const MemoryCard = ({ emoji, isFlipped, isMatched, onClick, disabled }: MemoryCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isFlipped || isMatched}
      className={cn(
        "card-flip w-full aspect-square",
        isFlipped && "card-flipped",
        isMatched && "card-flipped"
      )}
    >
      <div className="card-inner relative w-full h-full">
        {/* Card Back */}
        <div
          className={cn(
            "card-back absolute inset-0 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-primary to-secondary shadow-lg",
            "border-4 border-primary-foreground/20",
            "active:scale-95 transition-transform duration-100",
            !isFlipped && !isMatched && "hover:shadow-xl hover:scale-105"
          )}
        >
          <span className="text-3xl sm:text-4xl">❓</span>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "card-front absolute inset-0 rounded-xl flex items-center justify-center",
            "bg-card shadow-lg border-4",
            isMatched
              ? "border-success pulse-success bg-success/10"
              : "border-accent"
          )}
        >
          <span className="text-4xl sm:text-5xl">{emoji}</span>
        </div>
      </div>
    </button>
  );
};

export default MemoryCard;
