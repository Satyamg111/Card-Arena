import React from 'react';

const TrumpDecisionNotification = ({ visible, trump }: any) => {
  if (!visible || !trump) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-6 rounded-xl shadow-2xl animate-pulse">
        <p className="text-2xl font-bold text-center mb-2">🎺 Trump Suit Decided!</p>
        <p className="text-xl text-center font-semibold">
          {trump.trumpSuit === 'hearts' && '♥ Hearts'}
          {trump.trumpSuit === 'diamonds' && '♦ Diamonds'}
          {trump.trumpSuit === 'clubs' && '♣ Clubs'}
          {trump.trumpSuit === 'spades' && '♠ Spades'}
        </p>
        <p className="text-sm text-center mt-2 opacity-90">
          Case {trump.case} - {trump.suitsPlayed.length} different suits played
        </p>
      </div>
    </div>
  );
};

export default TrumpDecisionNotification;
