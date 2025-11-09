import React from 'react';
import Card from './Card';

const PlayerHand = ({ myHand, onPlayCard, disabled }: any) => (
  <div className="mt-8">
    <h3 className="text-white text-xl font-bold mb-4 text-center">
      Your Hand ({myHand.length} cards)
    </h3>
    <div className="flex flex-wrap justify-center gap-2">
      {myHand.map((card: any) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => !disabled && onPlayCard(card.id)}
          disabled={disabled}
        />
      ))}
    </div>
    {myHand.length === 0 && !disabled && (
      <p className="text-white text-center mt-4 text-lg">
        ✨ All cards played! Waiting for game results...
      </p>
    )}
  </div>
);

export default PlayerHand;
