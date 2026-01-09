import { useState, useCallback, useEffect } from "react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJI_SETS = [
  ["🍎", "🍊", "🍋", "🍇", "🍓", "🍒", "🥝", "🍑"],
  ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🎱", "🏓"],
  ["🚗", "🚕", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒"],
];

const getCardCount = (level: number): number => {
  // Level 1: 8 cards (4 pairs), Level 2: 12 cards (6 pairs), etc.
  const basePairs = 4;
  const pairs = Math.min(basePairs + (level - 1), 8);
  return pairs * 2;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createCards = (level: number): Card[] => {
  const cardCount = getCardCount(level);
  const pairsNeeded = cardCount / 2;
  const emojiSet = EMOJI_SETS[(level - 1) % EMOJI_SETS.length];
  const selectedEmojis = emojiSet.slice(0, pairsNeeded);

  const cards: Card[] = [];
  selectedEmojis.forEach((emoji, index) => {
    cards.push({ id: index * 2, emoji, isFlipped: false, isMatched: false });
    cards.push({ id: index * 2 + 1, emoji, isFlipped: false, isMatched: false });
  });

  return shuffleArray(cards);
};

export const useMemoryGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState<Card[]>(() => createCards(1));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isChecking || flippedCards.length >= 2) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      const newCards = cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      );
      setCards(newCards);
      setFlippedCards((prev) => [...prev, cardId]);
    },
    [cards, flippedCards, isChecking]
  );

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setScore((prev) => prev + 100 * level);
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards, level]);

  // Check for level completion
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setTimeout(() => setIsLevelComplete(true), 500);
    }
  }, [cards]);

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setCards(createCards(newLevel));
    setFlippedCards([]);
    setMoves(0);
    setIsLevelComplete(false);
  }, [level]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setMoves(0);
    setCards(createCards(1));
    setFlippedCards([]);
    setIsLevelComplete(false);
  }, []);

  const gridCols = cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 4;

  return {
    level,
    score,
    moves,
    cards,
    isChecking,
    isLevelComplete,
    gridCols,
    handleCardClick,
    nextLevel,
    restartGame,
  };
};
